import { makeAutoObservable } from "mobx";
import { router } from "../router/Routes";
import { toast } from "react-toastify";

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
}

export default class DevicesStore {
  devices: Device[] = [];
  homeData: HomeData | null = null;
  homeMatrix: HomeMap | null = null;
  sendData: Data | null = null;

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

  setHomeMap = (data: HomeMap | null) => {
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
      };
    } else {
      console.log("ne radi nesto na setHomeMap");
    }
  };
}
