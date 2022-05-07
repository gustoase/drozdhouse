import { TWsAction } from './domain';
declare class EventsService {
    events: TWsAction[];
    add(event: TWsAction): void;
}
declare const _default: EventsService;
export default _default;
