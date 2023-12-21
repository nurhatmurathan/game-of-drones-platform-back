import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpServer, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { CustomHttpExceptionResponse, HttpExceptionResponse } from './error-formats/http-response.interface';

import * as fs from 'fs';
import { error } from 'console';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();

        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        let status: HttpStatus;
        let errorMessage: string;

        if (exception instanceof HttpException) {
            status = exception.getStatus();
            const errorResponse = exception.getResponse()
            errorMessage = (errorResponse as HttpExceptionResponse).error || exception.message;
        } else {
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            errorMessage = 'Critical internal server error occured.';
        }

        const errorResponse = this.getErrorResponse(status, errorMessage, request);
        const errorLog = this.logError(errorResponse, request, exception);
        this.writeErrorLogToFile(errorLog);

        response.status(status).json(errorResponse);
    }


    private getErrorResponse(
        status: HttpStatus,
        errorMessage: string,
        request: Request
    ): CustomHttpExceptionResponse {

        const errorResponse: CustomHttpExceptionResponse = {
            statusCode: status,
            error: errorMessage,
            path: request.url,
            method: request.method,
            timeStamp: new Date(),
        };

        return errorResponse;
    }

    private logError(
        errorResponse: CustomHttpExceptionResponse,
        request: Request,
        exception: unknown
    ): string {
        const { statusCode, error } = errorResponse;
        const { url, method } = request;

        const user = request['user'] ? JSON.stringify(request['user']) : 'User not available';
        const errorLog = `Response code: ${statusCode} - Method: ${method} - URL: ${url}\n
            User: ${JSON.stringify(user)}\n
            Exception: ${exception instanceof HttpException ? exception.stack : error}\n\n`;

        return errorLog;
    }

    private writeErrorLogToFile(
        errorLog: string
    ): void {
        fs.appendFile('error.log', errorLog, 'utf8', (error) => {
            if (error) throw error;
        });
    }

}