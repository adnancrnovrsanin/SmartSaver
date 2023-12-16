export interface Home {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: number;
  area: number;
  appUserId: string;
  fieldRows: FieldRow[];
  mapRowCount: number;
  mapColumnCount: number;
  devices: Device[];
}

export interface FieldRow {
  id: string;
  homeId: string;
  fields: Field[];
}

export interface Field {
  id: string;
  coordinates: number[];
  deviceId?: string;
  fieldRowId: string;
  value: Number;
}

export interface Device {
  id: string;
  name: string;
  type: string;
  manufacturer: string;
  modelNumber: string;
  powerUsage: number;
  isOn: boolean;
  homeId: string;
}
