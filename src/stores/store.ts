import { createContext, useContext } from "react";
import CommonStore from "./commonStore";
import UserStore from "./userStore";
import DevicesStore from "./devicesStore";

interface Store {
    userStore: UserStore;
    commonStore: CommonStore;
    devicesStore: DevicesStore;
}

export const store: Store = {
    userStore: new UserStore(),
    commonStore: new CommonStore(),
    devicesStore: new DevicesStore(),
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}