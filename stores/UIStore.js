import { action, computed, makeObservable, observable } from "mobx";
class UIStore {
  constructor(rootStore) {
    this.rootStore = rootStore;

    makeObservable(this);
  }

  @observable formStep = 0;
  @observable menuOpen = false;
  @observable reviewOpen = false;
  @observable introInfoModalActive = false;

  @observable isPageTransition = false;
  @action.bound togglePageTransition(state) {
    this.isPageTransition = state;
  }

  @action.bound toggleMenuOpen() {
    this.menuOpen = !this.menuOpen;
  }

  @action.bound showIntroInfoModal() {
    this.introInfoModalActive = true;
  }

  @action.bound hideIntroInfoModal() {
    this.introInfoModalActive = false;
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
