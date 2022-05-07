"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZigbeeModule = void 0;
const common_1 = require("@nestjs/common");
const mqtt_controller_1 = require("./mqtt/mqtt.controller");
const microservices_1 = require("@nestjs/microservices");
const config_1 = require("@nestjs/config");
let ZigbeeModule = class ZigbeeModule {
};
ZigbeeModule = __decorate([
    (0, common_1.Module)({
        imports: [
            microservices_1.ClientsModule.registerAsync([
                {
                    name: 'MQTT_SERVICE',
                    imports: [config_1.ConfigModule],
                    useFactory: async (configService) => ({
                        transport: microservices_1.Transport.MQTT,
                        options: {
                            url: configService.get('mqtt'),
                            serializer: {
                                serialize(value) {
                                    return value.data;
                                },
                            },
                        },
                    }),
                    inject: [config_1.ConfigService],
                },
            ]),
        ],
        providers: [],
        controllers: [mqtt_controller_1.MqttController],
    })
], ZigbeeModule);
exports.ZigbeeModule = ZigbeeModule;
//# sourceMappingURL=zigbee.module.js.map