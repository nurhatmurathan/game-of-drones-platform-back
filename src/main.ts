import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as dotenv from "dotenv";

async function bootstrap() {
    dotenv.config();

    const app = await NestFactory.create(AppModule);
    // <<<<<<< HEAD
    //     app.enableCors({ allowedHeaders: ["http://*", "https://*", "*"] });

    // =======
    //     app.enableCors({
    //          origin: ['http://localhost:3000'],
    //   methods: ['GET', 'POST'],
    //   credentials: true,
    //       });
    // >>>>>>> 5301a972fe2b7fa7b067203c0baaab77725f3d5f
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
