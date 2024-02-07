import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { lastValueFrom } from 'rxjs';
import { FindOptionsRelations, Repository } from 'typeorm';
import { Item } from '../item/item.entity';
import { ItemService } from '../item/item.service';
import { UserService } from '../user/user.service';
import { Order } from './order.entity';

import { UtilService } from 'src/utils/util.service';
import { v4 as uuidv4 } from 'uuid';
import { LanguagesEnum } from '../../common/enums';
import { OrderStatus } from '../../common/enums/order.status';
import { TournamentService } from '../tournament/tournament.service';


@Injectable()
export class PaymentService {
    constructor(
        @InjectRepository(Order)
        private readonly orderRepository: Repository<Order>,
        private readonly tournamentService: TournamentService,
        private readonly utilService: UtilService,
        private readonly httpService: HttpService,
        private readonly userService: UserService,
        private readonly itemService: ItemService
    ) { }

    async createOrder(userId: number, tournamentId: number): Promise<Order> {
        const userInstance = await this.userService.findOneById(userId);
        const tournamentInstance = await this.tournamentService.findOneById(tournamentId);

        await this.isExistsSuccessOrderOfUser(userInstance.id, tournamentInstance.id);

        const generatedUuid = uuidv4();
        const createdInstance = this.orderRepository.create({
            id: generatedUuid,
            user: userInstance,
            tournament: tournamentInstance
        });

        return await this.orderRepository.save(createdInstance);
    }

    async findOneByPaymentId(payment_id: string, order_id: string, relations?: FindOptionsRelations<Order>): Promise<Order> {
        return await this.orderRepository.findOne({
            where: {
                id: order_id,
                paymentId: payment_id,
            },
            relations
        });
    }

    public async createPayment(language: LanguagesEnum, userId: number, tournamentId: number) {
        console.log("I'm in createPayment")
        const languageType = this.utilService.getLanguage(language);

        console.log("Step 1")
        const itemInstance = await this.itemService.findOne(1);
        console.log("Step 2")
        const orderInstance = await this.createOrder(userId, tournamentId);

        console.log("Step 3")
        try {
            const dataObject = await this.createDataObject(
                languageType,
                orderInstance,
                itemInstance,
            );
            console.log("Step 4")

            const response = await this.sendRequest(dataObject);
            console.log(response.data)

            console.log("Step 5")
            const decodeData = JSON.parse(await this.utilService.decodeData(response.data.data));
            console.log(decodeData);

            console.log("Step 6")
            orderInstance.paymentId = decodeData.payment_id;
            await this.orderRepository.save(orderInstance);
            console.log(orderInstance);

            return decodeData.payment_page_url;
        } catch (error) {
            return this.handleError(error);
        }
    }

    private async sendRequest(dataObject: any) {
        console.log("Step in sendRequest")
        const token = Buffer.from(process.env.PAYMENT_API_KEY).toString('base64');
        const signature = await this.utilService.generateSignature(
            dataObject,
            process.env.PAYMENT_SECRET_KEY
        );
        const requestObject = {
            data: Buffer.from(JSON.stringify(dataObject)).toString('base64'),
            sign: signature,
        };
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        };
        console.log("Step 1")

        return await lastValueFrom(this.httpService.post(
            process.env.PAYMENT_PAGE_CREATE_URL,
            requestObject, { headers }
        ));
    }


    private createDataObject(
        languageType: string,
        order: Order,
        item: Item,
    ) {
        return {
            amount: (order?.tournament.price * item.quantity),
            currency: "KZT",
            order_id: order.id,
            description: "ticket for participate in tournament",
            payment_type: "pay",
            payment_method: "ecom",
            items: [{
                merchant_id: item.merchantId,
                service_id: item.serviceId,
                merchant_name: item.merchantName,
                name: item.name,
                quantity: item.quantity,
                amount_one_pcs: order?.tournament.price,
                amount_sum: (order?.tournament.price * item.quantity)
            }],
            user_id: (order?.user.id).toString(),
            email: order?.user.email,
            // phone: "string",
            success_url: process.env.PAYMENT_SUCCESS_URL,
            failure_url: process.env.PAYMENT_FAILURE_URL,
            callback_url: process.env.PAYMENT_CALLBACK_URL,
            payment_lifetime: +process.env.PAYMENT_LIFETIME,
            create_recurrent_profile: false,
            recurrent_profile_lifetime: 0,
            lang: languageType,
            extra_params: {}
        };
    }

    private handleError(error: any) {
        if (error.response) {
            console.error('Error response data:', error.response.data);
            console.error('Error response status:', error.response.status);
            throw new BadRequestException('Error response data: ', error.response.data.error_msg);
        }
        else if (error.request) {
            console.error('No response:', error.request);
            throw new BadRequestException('No response:', error.request);
        }
        else {
            console.error('Error message:', error.message);
            throw new BadRequestException('No response:', error.message);
        }
    }


    async handlePaymentCallback(data: any): Promise<any> {
        console.log("Step in handlePaymentCallback")
        const decodeData = JSON.parse(await this.utilService.decodeData(data));

        console.log("Step 1")
        console.log(decodeData);
        console.log(decodeData?.operation_status);

        console.log("Step 2")
        const instance: Order = await this.findOneByPaymentId(
            decodeData.payment_id,
            decodeData.order_id,
            { user: true, tournament: true }
        );
        this.isExists(instance);

        console.log("Step 3")
        return decodeData?.operation_status === 'error'
            ? await this.handleErrorPayment(instance)
            : await this.handleSuccessPayment(instance);
    }

    private async handleErrorPayment(instance: Order): Promise<any> {
        console.log("I'm in handleErrorPayment");

        this.updateOrderStatus(instance, OrderStatus.Error);
        return { 'message': "Payment failed" };
    }

    private async handleSuccessPayment(instance: Order): Promise<any> {
        console.log("I'm in handleSuccessPayment");

        await this.updateOrderStatus(instance, OrderStatus.Success);
        return this.tournamentService.registerUserToTournament(instance?.user.id, instance?.tournament.id);
    }

    private updateOrderStatus(instance: Order, status: OrderStatus) {
        instance.status = status;
        return this.orderRepository.save(instance);
    }

    private isExists(instance: Order) {
        if (!instance)
            throw new NotFoundException(`Order not found`);
    }

    private async isExistsSuccessOrderOfUser(userId: number, tournamentId: number) {
        const instance = await this.orderRepository.findOne({
            where: {
                user: { id: userId },
                tournament: { id: tournamentId }
            }
        });

        if (instance && instance.status === OrderStatus.Success)
            throw new BadRequestException("User already bought this tournament");

        return instance;
    }

}
