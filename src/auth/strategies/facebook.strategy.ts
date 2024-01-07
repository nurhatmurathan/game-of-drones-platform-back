import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-facebook';
import { AuthService } from '../auth.service';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
    constructor(
        private authService: AuthService
    ) {
        super({
            clientID: process.env.FACEBOOK_APP_ID,
            clientSecret: process.env.FACEBOOK_APP_SECRET,
            callbackURL: 'http://localhost:3000/auth/facebook/callback',
            profileFields: ['name', 'email', 'photos'],
            scope: ['email', 'public_profile'],
        });
    }

    async validate(accessToken: string, refreshToken: string, profile: Profile, done: (err: any, user: any, info?: any) => void): Promise<any> {
        console.log("I'm here in Facebook Strategy");

        const user = await this.authService.validateUser(profile);
        const payload = { sub: user.id, isAdmin: user.isAdmin };
        const tokens = await this.authService.loginOAuthUser(payload);

        console.log({ user: payload, tokens });
        return { user: payload, tokens };

    }
}
