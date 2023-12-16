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
<<<<<<< HEAD
    const response = await agent.AccountRequests.login(loginRequest);
    const user: User = {
      username: response.username,
      firstName: response.firstName,
      lastName: response.lastName,
      id: response.id,
      email: response.email,
    };
    store.commonStore.setToken(response.token);
    runInAction(() => {
      this.user = user;
      this.getUser();
      router.navigate("/");
    });
=======
    try {
      const response = await agent.AccountRequests.login(loginRequest);
      const user: User = {
        userName: response.userName,
        firstName: response.firstName,
        lastName: response.lastName,
        email: response.email,
      };
      store.commonStore.setToken(response.token);
      runInAction(() => {
        this.user = user;
        this.getUser();
        router.navigate("/");
      });
    } catch (error) {
      console.log(error);
    }
>>>>>>> 43b001c98d32844d617e6aff2b651bb29a21544b
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
      });
    } catch (error) {
      console.log(error);
    }
  };

  logout = () => {
    store.commonStore.setToken(null);
    this.user = null;
    router.navigate("/");
  };

  getUser = async () => {
    try {
      const response = await agent.AccountRequests.current();
      store.commonStore.setToken(response.token);
      const user: User = {
        userName: response.userName,
        firstName: response.firstName,
        lastName: response.lastName,
        id: response.id,
        email: response.email,
      };
      runInAction(() => {
        this.user = user;
      });
    } catch (error) {
      console.log(error);
    }
  };
}
