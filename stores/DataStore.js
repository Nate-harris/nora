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
    colors: [],
    shipping: null,
    price: 0,
    letterPrice: 0,
    basePrice: 0,
    framePrice: 0,
    shippingPrice: 0,
    id: "commission",
  };
  @observable minNumLetters = 0;
  @observable maxNumLetters = 0;
  @observable minNumColors = 0;
  @observable maxNumColors = 0;
  @action.bound setCommissionId(id) {
    this.formData.id = id;
  }
  @action.bound setFormData(data) {
    this.formData = { ...this.formData, ...data };
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
  @action.bound addColor(color) {
    this.formData.colors.push(color);
  }
  @action.bound removeColor(color) {
    this.formData.colors = this.formData.colors.filter((c) => c !== color);
  }
  @action.bound clearColors() {
    this.formData.colors = [];
  }
  @computed get name() {
    return this.formData.name;
  }
  @computed get colors() {
    return this.formData.colors;
  }
  @computed get frame() {
    return this.formData.frame;
  }
  @computed get shipping() {
    return this.formData.shipping;
  }

  @computed get isNameCompleted() {
    return this.formData.name.length >= this.minNumLetters;
  }
  @computed get isColorCompleted() {
    return this.formData.colors.length >= this.minNumColors;
  }
  @computed get isFrameCompleted() {
    return this.formData.frame !== null;
  }
  @computed get isShippingCompleted() {
    return this.formData.shipping !== null;
  }

  @computed get productPrice() {
    return (
      this.formData.basePrice +
      this.formData.framePrice +
      this.formData.shippingPrice
    );
  }
  @action.bound updateLetterMinimum(min) {
    this.minNumLetters = min;
  }
  @action.bound updateLetterMaximum(max) {
    this.maxNumLetters = max;
  }
  @action.bound updateColorMinimum(min) {
    this.minNumColors = min;
  }
  @action.bound updateColorMaximum(max) {
    this.maxNumColors = max;
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
