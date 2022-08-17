import { TokenService } from './../../../authorization/services/token.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { pluck } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class VehicledataService {
  constructor(
    private httpClient: HttpClient,
    private tokenService: TokenService
  ) {}

  getVehicleData(valor?: string) {
    const params = valor ? new HttpParams().append('valor', valor) : undefined;

    const token = this.tokenService.getToken();

    const headers = new HttpHeaders().append('x-access-token', token);

    return this.httpClient
      .get<any>('http://localhost:3000/vehiclesdata', { params, headers })
      .pipe(pluck('VehiclesData'));
  }
}
