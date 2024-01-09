import { Injectable } from "@nestjs/common";
import { Request } from "express";

@Injectable()
export class UtilService {
    getLanguageFromHeaders(request: Request): string {
        const languageHeader = request.headers["language"];

        if (!languageHeader) {
            return "ru";
        }
        const language = languageHeader.toString();
        return language;
    }
}
