export default class Address {
  private _street: string = "";
  private _number: number = 0;
  private _zip: string = "";
  private _city: string = "";

  constructor(street: string, number: number, zip: string, city: string) {
    this._street = street;
    this._number = number;
    this._zip = zip;
    this._city = city;
    this.validate();
  }

  validate() {
    if (this._street.length === 0) {
      throw new Error("street is required");
    }
    if (this._number === 0) {
      throw new Error("number is required");
    }
    if (this._zip.length === 0) {
      throw new Error("zip is required");
    }
    if (this._city.length === 0) {
      throw new Error("city is required");
    }
  }

  toString() {
    return `${this._number}, ${this._number}, ${this._zip}, ${this._city}`;
  }
}
