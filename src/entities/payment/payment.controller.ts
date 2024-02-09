import { Body, Controller, Headers, Post, Req, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { CustomAuthGuard } from "../../auth/guards";
import { LanguagesEnum } from "../../common/enums";
import { TournamentRegisterDto } from "../tournament/dto";
import { PaymentService } from "./payment.service";

@ApiTags("Payment")
@Controller("payment")
export class PaymentController {
    constructor(private readonly paymentService: PaymentService) {}

    @Post()
    @ApiBearerAuth()
    @UseGuards(CustomAuthGuard)
    async buyTournament(
        @Req() request,
        @Body() body: TournamentRegisterDto,
        @Headers("Accept-Language") language: LanguagesEnum
    ) {
        console.log("I'm in buyTournament");
        const url = await this.paymentService.createPayment(language, request.user.sub, body.tournamentId);

        console.log(url);
        return { url: url };
    }

    @Post("callback")
    async handlePaymentCallback(@Req() request): Promise<any> {
        console.log("I'm in callback");
        return await this.paymentService.handlePaymentCallback(request.body.data);
    }
}
