import { makeAutoObservable, runInAction } from "mobx";
import { router } from "../router/Routes";
import { toast } from "react-toastify";
import { store } from "./store";
import agent from "@/api/agent";
import { Home } from "@/models/home";

export interface Device {
  name: string;
  type: string;
  manufacturer: string;
  modelNumber: string;
  powerUsage: number;
  isOn: boolean;
  homeId?: string;
  coordinates: any[];
}

export interface HomeData {
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface HomeMap {
  houseMap: Number[][];
  mapRowCount: number;
  mapColumnCount: number;
}

export interface Data {
  devices: Device[];
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  houseMap: Number[][];
  mapRowCount: number;
  mapColumnCount: number;
  appUserId: string;
}

export default class DevicesStore {
  devices: Device[] = [];
  homeData: HomeData | null = null;
  homeMatrix: HomeMap | null = null;
  sendData: Data | null = null;
  homes: Home[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  setDevices = (devices: Device | null) => {
    if (devices === null) {
      console.log("ovo ne radi");
      return;
    }
    this.devices.push(devices);
    toast.success("Device created successfully!");
  };

  setHomeData = (data: HomeData | null) => {
    if (data === null) {
      console.log("ovo ne radi");
      return;
    }
    if (data !== null) {
      let newHomeData: HomeData = {
        name: data.name,
        address: data.address,
        city: data.city,
        state: data.state,
        zipCode: data.zipCode,
      };
      this.homeData = newHomeData;
      toast.success("Correct data! Please create your home map.");
      router.navigate("/home-grid");
    } else {
      console.log("ne radi nesto na setHomeData");
    }
  };

  setHomeMap = async (data: HomeMap | null) => {
    try {
      if (data === null) {
        console.log("ovo ne radi");
        return;
      }
      if (data !== null) {
        let newHomeMap: HomeMap = {
          houseMap: data.houseMap,
          mapRowCount: data.mapRowCount,
          mapColumnCount: data.mapColumnCount,
        };
        this.homeMatrix = newHomeMap;
        // toast.success("Home created successfully!");
        // router.navigate("/dashboard");
        const newSendData: Data = {
          devices: this.devices,
          state: this.homeData?.state ?? "",
          name: this.homeData?.name ?? "",
          address: this.homeData?.address ?? "",
          city: this.homeData?.city ?? "",
          zipCode: this.homeData?.zipCode ?? "",
          houseMap: this.homeMatrix.houseMap,
          mapRowCount: this.homeMatrix.mapRowCount,
          mapColumnCount: this.homeMatrix.mapColumnCount,
          appUserId: store.userStore.user?.id ?? "",
        };
        this.sendData = newSendData;
        console.log();
        await agent.HomeRequests.create(newSendData);
        router.navigate("/");
      } else {
        console.log("ne radi nesto na setHomeMap");
      }
    } catch (error: any) {
      toast.error(error);
      console.log(error);
    }
  };

  getHomesForUser = async (userId: string) => {
    try {
      const response = await agent.HomeRequests.getUserHomes(userId);
      console.log(response);
      runInAction(() => {
        this.homes = response;
      });
    } catch (error) {
      console.log(error);
    }
  };
}
