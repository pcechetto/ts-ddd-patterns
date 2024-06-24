import Address from "./entity/address";
import Customer from "./entity/customer";
import Order from "./entity/order";
import OrderItem from "./entity/order_item";

let customer = new Customer("123", "oss")
const address = new Address("rua 1", 2, "12345-678", "sao paulo")
customer.Address = address;
customer.activate();

const item1 = new OrderItem("1", "item 1", 10);
const item2 = new OrderItem("2", "item 2", 15);

const order = new Order("1", "123", [item1, item2]);
