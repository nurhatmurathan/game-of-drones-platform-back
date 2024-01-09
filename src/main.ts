import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { useContainer } from "class-validator";
import * as dotenv from "dotenv";
import { AppModule } from "./app.module";


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
