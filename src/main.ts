import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as dotenv from "dotenv";
import { AllExceptionsFilter } from "./common/filters/all-exception.filter";
import { get } from "http";
import { createWriteStream } from "fs";
import { ValidationPipe } from "@nestjs/common";
import { useContainer } from "class-validator";

async function bootstrap() {
    dotenv.config();

    const app = await NestFactory.create(AppModule);

    app.enableCors();
    // app.useGlobalFilters(new AllExceptionsFilter());
    app.useGlobalPipes(new ValidationPipe());

    useContainer(app.select(AppModule), { fallbackOnErrors: true });

    const config = new DocumentBuilder()
        .addBearerAuth()
        .setTitle("Game Of Drones")
        .setVersion("1.0")
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("", app, document);

    await app.listen(3000);
}
bootstrap();
