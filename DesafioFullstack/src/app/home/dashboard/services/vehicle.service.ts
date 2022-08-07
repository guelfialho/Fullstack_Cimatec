import { VeiculosAPI } from '../models/VehiclesInterface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  constructor(private httpClient: HttpClient) {}

  public getVeiculos() {
    return this.httpClient.get<VeiculosAPI>('http://localhost:3000/vehicle');
  }
}
