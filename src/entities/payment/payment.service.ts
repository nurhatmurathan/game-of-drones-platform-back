import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createHmac } from 'crypto';
import { lastValueFrom } from 'rxjs';
import { Repository } from 'typeorm';
import { Item } from '../item/item.entity';
import { ItemService } from '../item/item.service';
import { UserService } from '../user/user.service';
import { Order } from './order.entity';

import { v4 as uuidv4 } from 'uuid';


@Injectable()
export class PaymentService {
    constructor(
        @InjectRepository(Order)
        private readonly orderRepository: Repository<Order>,
        private readonly httpService: HttpService,
        private readonly userService: UserService,
        private readonly itemService: ItemService
    ) { }

    public async createPayment(userId: number) {
        const secretKey = '6430916e7b13180c6772c0c257ba4133c723b345f918bf763279ed4438e3a051';
        const apiKey = 'a62135f0-6458-4e05-ba0b-b615ca0c556e';
        const token = Buffer.from(apiKey).toString('base64');

        const user = await this.userService.findOneById(userId);

        const generatedUuid = uuidv4();
        const createdInstance = this.orderRepository.create({
            id: generatedUuid,
            user: user
        });

        const savedInstance = await this.orderRepository.save(createdInstance);

        const item = await this.itemService.findOne(1);
        const dataObject = this.createDataObject(savedInstance, item);
        const signature = await this.generateSignature(dataObject, secretKey);
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

            const decodeData = JSON.parse(this.decodeData(response.data.data));
            console.log(decodeData);

            savedInstance.paymentId = response.data.payment_id;
            await this.orderRepository.save(savedInstance);

            console.log(savedInstance);

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
            callback_url: "http://example.com",
            payment_lifetime: 3600,
            create_recurrent_profile: false,
            recurrent_profile_lifetime: 0,
            lang: "ru",
            extra_params: {}
        };
    }

    private decodeData(encodedData: string): string {
        const buff = Buffer.from(encodedData, 'base64');
        const decodedData = buff.toString('utf-8');
        return decodedData;
    }

    private async generateSignature(dataObject: any, secretKey: string): Promise<string> {
        const dataJson = JSON.stringify(dataObject);
        const dataBase64 = Buffer.from(dataJson).toString('base64');
        return createHmac('sha512', secretKey).update(dataBase64).digest('hex');
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
