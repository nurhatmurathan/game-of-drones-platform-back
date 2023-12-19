import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as dotenv from "dotenv";

async function bootstrap() {
    dotenv.config();

    const app = await NestFactory.create(AppModule);
    app.enableCors({
        origin: '*',
      });
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
