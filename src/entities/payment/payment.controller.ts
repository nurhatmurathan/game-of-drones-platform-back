import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CustomAuthGuard } from 'src/auth/guards';
import { PaymentService } from './payment.service';

@ApiTags("Payment")
@Controller('payment')
export class PaymentController {
    constructor(private readonly paymentService: PaymentService) { }

    @Get()
    @ApiBearerAuth()
    @UseGuards(CustomAuthGuard)
    async buyTournament(@Req() request, @Res() response) {
        console.log("I'm in buyTournament");

        const url = await this.paymentService.createPayment(request.user.sub);
        console.log(url);
        return response.redirect(url);
    }

    @Post('callback')
    async handlePaymentCallback(@Req() request, @Res() response): Promise<any> {
        console.log("I'm in callback");
        console.log(request.data);
        // return response.redirect('https://platform.gameofdrones.kz/ru/auth/oauth');
    }

}
