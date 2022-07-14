import { action, computed, makeObservable, observable } from "mobx";

class DataStore {
  constructor(rootStore) {
    this.rootStore = rootStore;

    makeObservable(this);
  }

  @observable formData = {};
}

export default DataStore;
