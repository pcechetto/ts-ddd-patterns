import Address from "../../entity/address";
import Customer from "../../entity/customer";
import EventDispatcher from "../shared/event-dispatcher";
import CustomerChangedAddressEvent from "./customer-changed-address.event";
import CustomerCreatedEvent from "./customer-created.event";
import SendEmailAfterAddressIsChanged from "./handler/send-email-after-address-is-changed";
import SendEmailWhenAddressIsChanged from "./handler/send-email-when-address-is-changed";
import SendEmailWhenCustomerIsCreated from "./handler/send-email-when-customer-is-created";

describe("domain events tests: customer", () => {
  it("should notify all event handlers when customer is created", () => {
    const eventDispatcher = new EventDispatcher();

    const sendEmailWhenCustomerIsCreated = new SendEmailWhenCustomerIsCreated();
    const sendEmailAfterAddressIsChanged = new SendEmailAfterAddressIsChanged();

    const spyEventHandlerMessageOne = jest.spyOn(
      sendEmailWhenCustomerIsCreated,
      "handle"
    );
    const spyEventHandlerMessageTwo = jest.spyOn(
      sendEmailAfterAddressIsChanged,
      "handle"
    );

    eventDispatcher.register(
      "CustomerCreatedEvent",
      sendEmailWhenCustomerIsCreated
    );
    eventDispatcher.register(
      "CustomerCreatedEvent",
      sendEmailAfterAddressIsChanged
    );

    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]
    ).toMatchObject(sendEmailWhenCustomerIsCreated);
    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]
    ).toMatchObject(sendEmailAfterAddressIsChanged);

    const customerCreatedEvent = new CustomerCreatedEvent({
      id: "1",
      name: "Customer name",
    });

    eventDispatcher.notify(customerCreatedEvent);

    expect(spyEventHandlerMessageOne).toHaveBeenCalled();
    expect(spyEventHandlerMessageTwo).toHaveBeenCalled();
  });

  it("should notify all event handlers when customer address changes", () => {
    const eventDispatcher = new EventDispatcher();
    const sendEmailWhenAddressIsChangedHandler =
      new SendEmailWhenAddressIsChanged();

    const spyEventHandler = jest.spyOn(
      sendEmailWhenAddressIsChangedHandler,
      "handle"
    );

    let customer = new Customer("123", "Customer 1");
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer.changeAddress(address);

    eventDispatcher.register(
      "CustomerChangedAddressEvent",
      sendEmailWhenAddressIsChangedHandler
    );

    const customerChangedAddressEvent = new CustomerChangedAddressEvent({
      id: customer.id,
      name: customer.name,
      address: customer.Address,
    });

    eventDispatcher.notify(customerChangedAddressEvent);

    expect(spyEventHandler).toHaveBeenCalled();
  });
});