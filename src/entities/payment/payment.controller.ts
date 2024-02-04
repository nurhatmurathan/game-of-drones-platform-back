import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CustomAuthGuard } from 'src/auth/guards';
import { TournamentRegisterDto } from '../tournament/dto';
import { PaymentService } from './payment.service';

@ApiTags("Payment")
@Controller('payment')
export class PaymentController {
    constructor(private readonly paymentService: PaymentService) { }

    @Post()
    @ApiBearerAuth()
    @UseGuards(CustomAuthGuard)
    async buyTournament(
        @Req() request,
        @Res() response,
        @Body() body: TournamentRegisterDto,
    ) {
        console.log("I'm in buyTournament");

        const url = await this.paymentService.createPayment(request.user.sub, body.tournamentId);
        console.log(url);
        return response.redirect(url);
    }

    // @Post("select")
    // @HttpCode(HttpStatus.CREATED)
    // async registerUserToTournament(@Body() body: TournamentRegisterDto, @Request() req): Promise<any> {
    //     console.log("I'am in registerUserToTournament")
    //     return await this.tournamentService.registerUserToTournament(req.user.sub, body.tournamentId);
    // }

    @Post('callback')
    async handlePaymentCallback(@Req() request): Promise<any> {
        console.log("I'm in callback");

        return await this.paymentService.handlePaymentCallback(request.body.data);
        // return response.redirect('https://platform.gameofdrones.kz/ru/auth/oauth');
    }
}
