import { isServer } from "../utils/isServer";
import UIStore from "./UIStore";
import DataStore from "./DataStore";
import React from "react";
import { enableStaticRendering } from "mobx-react";
import { useMemo } from "react";
import {
  action,
  observable,
  computed,
  runInAction,
  makeObservable,
} from "mobx";

// eslint-disable-next-line react-hooks/rules-of-hooks
enableStaticRendering(typeof window === "undefined");

let store;

class Store {
  constructor() {
    this.uiStore = new UIStore(this);
    this.dataStore = new DataStore(this);
  }
}

function initializeStore(initialData = null) {
  const _store = store ?? new Store();

  // If your page has Next.js data fetching methods that use a Mobx store, it will
  // get hydrated here, check `pages/ssg.js` and `pages/ssr.js` for more details
  if (initialData) {
    _store.hydrate(initialData);
  }
  // For SSG and SSR always create a new store
  if (typeof window === "undefined") return _store;
  // Create the store once in the client
  if (!store) store = _store;

  return _store;
}

export function useStore(initialState) {
  const store = useMemo(() => initializeStore(initialState), [initialState]);
  return store;
}
