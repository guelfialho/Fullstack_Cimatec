import { VeiculosAPI } from '../models/VehiclesInterface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenService } from 'src/app/authorization/services/token.service';
import { pluck } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  constructor(
    private httpClient: HttpClient,
    private tokenService: TokenService
  ) {}

  public getVeiculos() {
    const token = this.tokenService.getToken();

    const headers = new HttpHeaders().append('x-access-token', token);
    return this.httpClient
      .get<VeiculosAPI>('http://localhost:3000/vehicles', { headers })
      .pipe(pluck('Vehicles'));
  }
}
