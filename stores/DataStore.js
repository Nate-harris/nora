import { action, computed, makeObservable, observable } from "mobx";

class DataStore {
  constructor(rootStore) {
    this.rootStore = rootStore;

    makeObservable(this);
  }

  @observable formData = {
    name: "",
    frame: null,
    palette: null,
    shipping: null,
    price: 0,
    letterPrice: 0,
    basePrice: 0,
    framePrice: 0,
    shippingPrice: 0,
    id: "commission",
  };
  @action.bound setCommissionId(id) {
    this.formData.id = id;
  }

  @action.bound setName(name) {
    this.formData.name = name;
  }
  @action.bound setPalette(palette) {
    this.formData.palette = palette;
  }
  @action.bound setFrame(frame) {
    this.formData.frame = frame;
  }
  @action.bound setShipping(shipping) {
    this.formData.shipping = shipping;
  }
  @computed get productPrice() {
    return (
      this.formData.basePrice +
      this.formData.framePrice +
      this.formData.shippingPrice
    );
  }
  @action.bound updateLetterPrice(price) {
    this.formData.letterPrice = price;
  }
  @action.bound updateBasePrice(price) {
    this.formData.basePrice = price;
  }
  @action.bound updateFramePrice(price) {
    this.formData.framePrice = price;
  }
  @action.bound updateShippingPrice(price) {
    this.formData.shippingPrice = price;
  }
  @action.bound addToProductPrice(price) {
    this.formData.price += price;
  }
  @action.bound subtractFromProductPrice(price) {
    this.formData.price -= price;
  }
}

export default DataStore;
