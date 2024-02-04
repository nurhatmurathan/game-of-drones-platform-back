import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { lastValueFrom } from 'rxjs';
import { FindOptionsRelations, Repository } from 'typeorm';
import { Item } from '../item/item.entity';
import { ItemService } from '../item/item.service';
import { UserService } from '../user/user.service';
import { Order, OrderStatus } from './order.entity';

import { UtilService } from 'src/utils/util.service';
import { v4 as uuidv4 } from 'uuid';
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

        const generatedUuid = uuidv4();
        const createdInstance = this.orderRepository.create({
            id: generatedUuid,
            user: userInstance,
            tournament: tournamentInstance
        });

        return await this.orderRepository.save(createdInstance);
    }

    async findOne(payment_id: string, order_id: string, relations?: FindOptionsRelations<Order>): Promise<Order> {
        return await this.orderRepository.findOne({
            where: {
                id: order_id,
                paymentId: payment_id,
            },
            relations
        });
    }

    public async createPayment(userId: number, tournamentId: number) {
        const orderInstance = await this.createOrder(userId, tournamentId);
        const itemInstance = await this.itemService.findOne(1);

        try {
            const response = await this.sendRequest(orderInstance, itemInstance);
            console.log(response.data)

            const decodeData = JSON.parse(await this.utilService.decodeData(response.data.data));
            console.log(decodeData);

            orderInstance.paymentId = decodeData.payment_id;
            await this.orderRepository.save(orderInstance);

            console.log(orderInstance);

            return decodeData.payment_page_url;
        } catch (error) {
            return this.handleError(error);
        }
    }

    private async sendRequest(orderInstance: Order, itemInstance: Item) {
        const secretKey = '6430916e7b13180c6772c0c257ba4133c723b345f918bf763279ed4438e3a051';
        const apiKey = 'a62135f0-6458-4e05-ba0b-b615ca0c556e';

        const dataObject = await this.createDataObject(orderInstance, itemInstance);

        const token = Buffer.from(apiKey).toString('base64');
        const signature = await this.utilService.generateSignature(dataObject, secretKey);
        const requestObject = {
            data: Buffer.from(JSON.stringify(dataObject)).toString('base64'),
            sign: signature,
        };
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        };

        return await lastValueFrom(this.httpService.post('https://api.onevisionpay.com/payment/create', requestObject, { headers }));
    }


    private createDataObject(order: Order, item: Item): any {
        return {
            amount: 5000,
            currency: "KZT",
            order_id: order.id,
            description: "string",
            payment_type: "pay",
            payment_method: "ecom",
            items: [{
                merchant_id: item.merchantId,
                service_id: item.serviceId,
                merchant_name: item.merchantName,
                name: item.name,
                quantity: item.quantity,
                amount_one_pcs: item.amountOnePcs,
                amount_sum: item.amountSum
            }],
            user_id: (order?.user.id).toString(),
            email: order?.user.email,
            // phone: "string",
            success_url: "https://platform.gameofdrones.kz/ru",
            failure_url: "https://platform.gameofdrones.kz/ru/auth",
            callback_url: "https://g-of-d-run-dev-era7gcma5a-uc.a.run.app/payment/callback",
            payment_lifetime: 3600,
            create_recurrent_profile: false,
            recurrent_profile_lifetime: 0,
            lang: "ru",
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
        const decodeData = JSON.parse(await this.utilService.decodeData(data));

        console.log(data);
        console.log(data?.operation_status);

        const instance: Order = await this.findOne(decodeData.payment_id, decodeData.order_id, { user: true, tournament: true });
        this.isExists(instance);

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

}
