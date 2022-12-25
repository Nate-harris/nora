import { action, computed, makeObservable, observable } from "mobx";
class UIStore {
  constructor(rootStore) {
    this.rootStore = rootStore;

    makeObservable(this);
  }

  @observable formStep = 0;
  @observable menuOpen = false;
  @observable reviewOpen = false;

  @action.bound incrementFormStep(router) {
    this.nextButtonDisabled = true;
    this.formStep = this.formStep + 1;
    //router.push(`/order?step=${this.formStep}`, undefined, { shallow: true });
  }
  @action.bound setFormStep(router, step) {
    this.formStep = step;
    //router.push(`/order?step=${this.formStep}`, undefined, { shallow: true });
  }
  @action.bound shallowUpdateQueryParam(key, value) {
    if ("URLSearchParams" in window) {
      var searchParams = new URLSearchParams(window.location.search);
      searchParams.set(key, value);
      var newRelativePathQuery =
        window.location.pathname + "?" + searchParams.toString();
      history.pushState(null, "", newRelativePathQuery);
    }
  }
  @action.bound decrementFormStep(router) {
    this.formStep = this.formStep - 1;
    //router.push(`/order?step=${this.formStep}`, undefined, { shallow: true });
  }
  @action.bound toggleMenuOpen() {
    this.menuOpen = !this.menuOpen;
  }

  @action.bound toggleReviewOpen() {
    this.reviewOpen = !this.reviewOpen;
  }

  @action.bound clearRouteVariables() {
    this.menuOpen = false;
    this.reviewOpen = false;
  }
}

export default UIStore;
