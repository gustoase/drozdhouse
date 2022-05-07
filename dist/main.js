"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const microservices_1 = require("@nestjs/microservices");
const config_1 = require("@nestjs/config");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const config = app.get(config_1.ConfigService);
    await app.connectMicroservice({
        transport: microservices_1.Transport.MQTT,
        options: {
            url: config.get('mqtt'),
        },
    });
    await app.startAllMicroservices();
    app.listen(3001);
}
bootstrap();
//# sourceMappingURL=main.js.map