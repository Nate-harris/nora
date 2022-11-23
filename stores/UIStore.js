import { action, computed, makeObservable, observable } from "mobx";
import { FORM_SCREENS } from "../pages";
class UIStore {
  constructor(rootStore) {
    this.rootStore = rootStore;

    makeObservable(this);
  }

  @observable formStep = 0;
  @observable menuOpen = false;
  @observable reviewOpen = false;

  @action.bound setFormStep(step) {
    this.formStep = step;
  }
  @action.bound incrementFormStep() {
    this.nextButtonDisabled = true;
    this.formStep = this.formStep + 1;
  }
  @action.bound decrementFormStep() {
    this.formStep = this.formStep - 1;
  }
  @action.bound toggleMenuOpen() {
    this.menuOpen = !this.menuOpen;
  }

  @action.bound toggleReviewOpen() {
    console.log("toggleReviewOpen");
    this.reviewOpen = !this.reviewOpen;
  }

  @computed get noPreviousPage() {
    return this.formStep <= 0;
  }
  @computed get noNextPage() {
    return this.formStep + 1 > FORM_SCREENS;
  }
  @action.bound clearRouteVariables() {
    this.menuOpen = false;
    this.reviewOpen = false;
  }
}

export default UIStore;
