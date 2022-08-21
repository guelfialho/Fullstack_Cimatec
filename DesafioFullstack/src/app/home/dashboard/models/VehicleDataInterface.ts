export interface VehiclesData extends Array<VehicleData> {}

export interface VehicleData {
  id?: number;
  vin: string;
  odometer: string;
  tirePressure: string;
  status: string;
  batteryStatus: string;
  fuelLevel: string;
  latitude: string;
  longitude: string;
}
