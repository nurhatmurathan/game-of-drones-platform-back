import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { lastValueFrom } from 'rxjs';
import { Repository } from 'typeorm';
import { Item } from '../item/item.entity';
import { ItemService } from '../item/item.service';
import { UserService } from '../user/user.service';
import { Order } from './order.entity';

import { UtilService } from 'src/utils/util.service';
import { v4 as uuidv4 } from 'uuid';


@Injectable()
export class PaymentService {
    constructor(
        @InjectRepository(Order)
        private readonly orderRepository: Repository<Order>,
        private readonly utilService: UtilService,
        private readonly httpService: HttpService,
        private readonly userService: UserService,
        private readonly itemService: ItemService
    ) { }

    async createOrder(userId: number): Promise<Order> {
        const user = await this.userService.findOneById(userId);

        const generatedUuid = uuidv4();
        const createdInstance = this.orderRepository.create({
            id: generatedUuid,
            user: user
        });

        return await this.orderRepository.save(createdInstance);
    }

    public async createPayment(userId: number) {
        const secretKey = '6430916e7b13180c6772c0c257ba4133c723b345f918bf763279ed4438e3a051';
        const apiKey = 'a62135f0-6458-4e05-ba0b-b615ca0c556e';

        const orderInstance = await this.createOrder(userId);
        const itemInstance = await this.itemService.findOne(1);


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

        console.log(dataObject);

        try {
            const response = await lastValueFrom(this.httpService.post('https://api.onevisionpay.com/payment/create', requestObject, { headers }));
            console.log(response.data)

            const decodeData = JSON.parse(await this.utilService.decodeData(response.data.data));
            console.log(decodeData);

            orderInstance.paymentId = response.data.payment_id;
            await this.orderRepository.save(orderInstance);

            console.log(orderInstance);

            return decodeData.payment_page_url;
        } catch (error) {
            this.handleError(error);
        }


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
            email: "aferdust@gmail.com",
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
        }
        else if (error.request)
            console.error('No response:', error.request);
        else
            console.error('Error message:', error.message);
    }

}
