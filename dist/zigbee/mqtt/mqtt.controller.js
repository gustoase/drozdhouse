"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MqttController = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const common_2 = require("@nestjs/common");
const events_decorator_1 = require("../../gateways/events.decorator");
let MqttController = class MqttController {
    constructor(client) {
        this.client = client;
        client.emit('zigbee2mqtt/switch1/set', { state: 'TOGGLE' });
    }
    tempFunction(context, data) {
        console.log('zigbee2mqtt:', data);
        if (data.hasOwnProperty('action')) {
            console.log('ACTION', data.action);
        }
    }
    button1Set(context, data) {
        this.client.emit('zigbee2mqtt/switch1/set', { state: 'TOGGLE' });
    }
    tempFunctio2n(context, data) {
        console.log('zigbee2mqtt_devices:', data[1].definition.exposes[0]);
    }
    send() {
        this.client.emit('zigbee2mqtt/switch1/set', { state: 'TOGGLE' });
        return 1;
    }
};
__decorate([
    (0, microservices_1.MessagePattern)('zigbee2mqtt/#'),
    __param(0, (0, microservices_1.Ctx)()),
    __param(1, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [microservices_1.MqttContext, Object]),
    __metadata("design:returntype", void 0)
], MqttController.prototype, "tempFunction", null);
__decorate([
    (0, microservices_1.MessagePattern)('zigbee2mqtt/button1'),
    __param(0, (0, microservices_1.Ctx)()),
    __param(1, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [microservices_1.MqttContext, Object]),
    __metadata("design:returntype", void 0)
], MqttController.prototype, "button1Set", null);
__decorate([
    (0, microservices_1.MessagePattern)('zigbee2mqtt/bridge/devices'),
    __param(0, (0, microservices_1.Ctx)()),
    __param(1, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [microservices_1.MqttContext, Object]),
    __metadata("design:returntype", void 0)
], MqttController.prototype, "tempFunctio2n", null);
__decorate([
    (0, common_1.Get)(),
    (0, events_decorator_1.WsAction)('zigbee'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Number)
], MqttController.prototype, "send", null);
MqttController = __decorate([
    (0, common_2.Injectable)(),
    (0, common_1.Controller)('mqtt'),
    __param(0, (0, common_2.Inject)('MQTT_SERVICE')),
    __metadata("design:paramtypes", [microservices_1.ClientMqtt])
], MqttController);
exports.MqttController = MqttController;
//# sourceMappingURL=mqtt.controller.js.map