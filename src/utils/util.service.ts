import { Injectable } from "@nestjs/common";
import { Request } from "express";

@Injectable()
export class UtilService {
    getLanguageFromHeaders(request: Request): string {
        const languageHeader = request.headers["Accept-Language"];
        if (
            !languageHeader ||
            !new Set(["en", "ru", "kz"]).has(languageHeader as string)
        ) {
            return "ru";
        }
        const language = languageHeader.toString();
        return language;
    }
}
