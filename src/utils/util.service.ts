import { Injectable } from "@nestjs/common";
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
}
