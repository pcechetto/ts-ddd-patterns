import Address from "../../entity/address";
import EventInterface from "../shared/event.interface";

export default class CustomerCreatedEvent implements EventInterface {
  dateTimeOcurred: Date;
  eventData: {
    id: string;
    name: string;
  };

  constructor(eventData: { id: string; name: string }) {
    this.dateTimeOcurred = new Date();
    this.eventData = eventData;
  }
}
