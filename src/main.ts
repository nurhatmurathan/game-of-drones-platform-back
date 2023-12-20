import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as dotenv from "dotenv";
import { get } from "http";
import { createWriteStream } from "fs";

async function bootstrap() {
    dotenv.config();

    const app = await NestFactory.create(AppModule);
    app.enableCors({
        origin: "*",
        allowedHeaders: "Content-Type, Accept",
        credentials: true,
        methods: "GET,PUT,POST,DELETE,OPTIONS",
        optionsSuccessStatus: 200,
    });

    const config = new DocumentBuilder()
        .addBearerAuth()
        .setTitle("Game Of Drones")
        .setVersion("1.0")
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("api-docs", app, document);

    await app.listen(3000);
}
bootstrap();
