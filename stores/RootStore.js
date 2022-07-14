import UIStore from "./UIStore";
import DataStore from "./DataStore";

class RootStore {
  constructor() {
    this.uiStore = new UIStore(this);
    this.dataStore = new DataStore(this);
  }
}

export default RootStore;
