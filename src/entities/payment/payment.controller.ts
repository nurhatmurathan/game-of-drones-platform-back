import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CustomAuthGuard } from 'src/auth/guards';
import { PaymentService } from './payment.service';

@ApiTags("Payment")
@Controller('payment')
@ApiBearerAuth()
@UseGuards(CustomAuthGuard)
export class PaymentController {
    constructor(private readonly paymentService: PaymentService) { }

    @Get()
    async buyTournament(@Req() req, @Res() res) {
        const url = await this.paymentService.createPayment(req.user.sub);

        // console.log(url);
        res.redirect(url);
    }

    //   @Post('callback')
    //   async handlePaymentCallback(@Body() callbackData: any): Promise<any> {
    //     const paymentId = callbackData.payment_id;
    //     const status = callbackData.status;

    //     await this.paymentService.updatePaymentStatus(paymentId, status);

    //     switch (status) {
    //       case 'created':
    //         break;
    //       case 'refunded':
    //         break;
    //     }

    //     return { success: true };
    //   }
}
