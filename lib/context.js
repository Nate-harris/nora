import { createContext, useContext } from "react";

import rootStore from "../stores/store";

export const storeContext = createContext(rootStore);

export const useStore = () => useContext(storeContext);
