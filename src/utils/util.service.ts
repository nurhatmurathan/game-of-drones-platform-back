import { Injectable } from "@nestjs/common";
import { Request } from "express";

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
        console.log(
            !languageHeader ||
                !new Set(["en", "ru", "kz"]).has(languageHeader as string)
        );
        const language = languageHeader.toString();
        return language;
    }

    getLanguage(language: string) {
        if (!language || !new Set(["en", "ru", "kz"]).has(language as string)) {
            return "ru";
        }
        return language;
    }
}
