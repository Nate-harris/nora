import { action, computed, makeObservable, observable } from "mobx";

class UIStore {
  constructor(rootStore) {
    this.rootStore = rootStore;

    makeObservable(this);
  }

  @observable formStep = 0;

  @action.bound setFormStep(step) {
    this.formStep = step;
  }
  @action.bound incrementFormStep() {
    this.formStep = this.formStep + 1;
  }
  @action.bound decrementFormStep() {
    this.formStep = this.formStep - 1;
  }
}

export default UIStore;
