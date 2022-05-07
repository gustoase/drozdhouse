import { TWsAction } from './domain';

class EventsService {
  events: TWsAction[] = [];

  add(event: TWsAction) {
    this.events.push(event);
  }
}

export default new EventsService();
