"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WsAction = void 0;
const events_service_1 = require("./events.service");
const WsAction = (moduleName, metadata) => {
    return (target, propertyKey, descriptor) => {
        events_service_1.default.add({
            targetClass: target,
            actionName: propertyKey.toString(),
            moduleName: moduleName,
            handler: descriptor.value,
            metadata,
        });
        return descriptor;
    };
};
exports.WsAction = WsAction;
//# sourceMappingURL=events.decorator.js.map