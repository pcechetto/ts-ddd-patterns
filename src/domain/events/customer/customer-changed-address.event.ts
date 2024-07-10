import Address from "../../entity/address";
import EventInterface from "../shared/event.interface";

export default class CustomerChangedAddressEvent implements EventInterface {
  dateTimeOcurred: Date;
  eventData: {
    id: string;
    name: string;
    address: Address;
  };

  constructor(eventData: { id: string; name: string; address: Address }) {
    this.dateTimeOcurred = new Date();
    this.eventData = eventData;
  }
}
