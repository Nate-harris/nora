import UIStore from "./UIStore";
import DataStore from "./DataStore";

export class RootStore {
  constructor() {
    this.uiStore = new UIStore(this);
    this.dataStore = new DataStore(this);
  }
}
