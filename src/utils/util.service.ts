import { Injectable } from "@nestjs/common";
import { createHmac } from 'crypto';
import { Request } from "express";
import { LanguagesEnum } from "./../common/enums/languages";

@Injectable()
export class UtilService {
    getLanguageFromHeaders(request: Request): string {
        const languageHeader = request.headers["Accept-Language"];
        console.log(languageHeader);
        if (
            !languageHeader ||
            !new Set(["en", "ru", "kz"]).has(languageHeader as string)
        ) {
            return "ru";
        }
        const language = languageHeader.toString();
        return language;
    }

    getLanguage(language: LanguagesEnum): LanguagesEnum {
        if (!language || !LanguagesEnum[language]) {
            return LanguagesEnum.ru;
        }
        return language;
    }

    async decodeData(encodedData: string): Promise<string> {
        const buff = Buffer.from(encodedData, 'base64');
        const decodedData = buff.toString('utf-8');
        return decodedData;
    }

    async generateSignature(dataObject: any, secretKey: string): Promise<string> {
        const dataJson = JSON.stringify(dataObject);
        const dataBase64 = Buffer.from(dataJson).toString('base64');
        return createHmac('sha512', secretKey).update(dataBase64).digest('hex');
    }
}
