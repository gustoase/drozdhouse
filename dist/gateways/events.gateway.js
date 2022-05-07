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
var EventsGateway_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventsGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const events_service_1 = require("./events.service");
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const validation_config_1 = require("../config/validation.config");
let EventsGateway = EventsGateway_1 = class EventsGateway {
    constructor(moduleRef) {
        this.moduleRef = moduleRef;
        this.logger = new common_1.Logger(EventsGateway_1.name);
        this.validator = new common_1.ValidationPipe(validation_config_1.default);
    }
    afterInit() {
        events_service_1.default.events.forEach((action) => {
            action.context = this.moduleRef.get(action.targetClass.constructor, {
                strict: false,
            });
            this.logger.log(`Add WS action: ${action.targetClass.constructor.name} => ${action.moduleName}:${action.actionName}`);
        });
    }
    async handleConnection(socket) {
        events_service_1.default.events.forEach((action) => {
            socket.on(`${action.moduleName}:${action.actionName}`, async (payload, response) => {
                try {
                    const handler = action.handler.bind(action.context);
                    const data = Object.assign({}, payload);
                    delete data.id;
                    if (action.metadata) {
                        await this.validator.transform(data, action.metadata);
                    }
                    const result = action.actionName === 'update'
                        ? await handler(payload.id, data, socket)
                        : await handler(payload, socket);
                    response({ status: 'success', data: result });
                }
                catch (e) {
                    response({ status: 'error', data: e });
                }
            });
        });
        socket.emit('ready', { date: new Date() });
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], EventsGateway.prototype, "server", void 0);
EventsGateway = EventsGateway_1 = __decorate([
    (0, websockets_1.WebSocketGateway)({
        transports: ['websocket', 'polling'],
        path: '/ws',
    }),
    __metadata("design:paramtypes", [core_1.ModuleRef])
], EventsGateway);
exports.EventsGateway = EventsGateway;
//# sourceMappingURL=events.gateway.js.map