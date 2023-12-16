import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { store } from "./store";
import { router } from "../router/Routes";
import { LoginRequestDto, RegisterRequestDto, User } from "@/models/user";

export default class UserStore {
  user: User | null = null;
  loading = false;

  constructor() {
    makeAutoObservable(this);
  }

  get isLoggedIn() {
    return !!this.user;
  }

  login = async (email: string, password: string) => {
    const loginRequest: LoginRequestDto = {
      email,
      password,
    };

    try {
      const response = await agent.AccountRequests.login(loginRequest);
      console.log(response);
      const user: User = {
        userName: response.userName,
        firstName: response.firstName,
        lastName: response.lastName,
        email: response.email,
        id: response.id,
      };
      store.commonStore.setToken(response.token);
      window.localStorage.setItem("jwt", response.token);
      runInAction(() => {
        this.user = user;
        // this.getUser();
        store.devicesStore.getHomesForUser(user.id);
        router.navigate("/");
      });
    } catch (error) {
      console.log(error);
    }
  };

  register = async (user: RegisterRequestDto) => {
    try {
      const response = await agent.AccountRequests.register(user);
      store.commonStore.setToken(response.token);
      const newUser: User = {
        userName: response.userName,
        firstName: response.firstName,
        lastName: response.lastName,
        id: response.id,
        email: response.email,
      };
      runInAction(() => {
        this.user = newUser;
        store.devicesStore.getHomesForUser(newUser.id);
      });
    } catch (error) {
      console.log(error);
    }
  };

  logout = () => {
    store.commonStore.setToken(null);
    // window.localStorage.removeItem("jwt");
    this.user = null;
    router.navigate("/");
  };

  // getUser = async () => {
  //   try {
  //     const response = await agent.AccountRequests.current();
  //     store.commonStore.setToken(response.token);
  //     window.localStorage.setItem("jwt", response.token);
  //     const user: User = {
  //       userName: response.userName,
  //       firstName: response.firstName,
  //       lastName: response.lastName,
  //       id: response.id,
  //       email: response.email,
  //     };
  //     runInAction(() => {
  //       this.user = user;
  //       store.devicesStore.getHomesForUser(user.id);
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
}
