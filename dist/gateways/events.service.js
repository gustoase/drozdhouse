"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class EventsService {
    constructor() {
        this.events = [];
    }
    add(event) {
        this.events.push(event);
    }
}
exports.default = new EventsService();
//# sourceMappingURL=events.service.js.map