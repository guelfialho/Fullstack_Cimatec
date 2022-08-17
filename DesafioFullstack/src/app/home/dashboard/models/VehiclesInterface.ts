export interface Veiculos extends Array<Veiculo> {}

export interface Veiculo {
  id: number | string;
  model: string;
  sold: number | string;
  connected: number | string;
  softwareUpdates: number | string;
}

export interface VeiculosAPI {
  Vehicles: Veiculos;
}
