import { TokenService } from 'src/app/authorization/services/token.service';
import { Injectable } from '@angular/core';
import { HttpParams, HttpClient, HttpHeaders } from '@angular/common/http';
import { VehicleData } from '../dashboard/models/VehicleDataInterface';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AddVehicledataService {
  constructor(
    private httpClient: HttpClient,
    private tokenService: TokenService
  ) {}

  addVehicleData(vehicledata: VehicleData) {
    const token = this.tokenService.getToken();

    const headers = new HttpHeaders().append('x-access-token', token);

    return this.httpClient
      .post(
        'http://localhost:3000/vehiclesdata',
        {
          ...vehicledata,
        },
        { observe: 'response', headers }
      )
      .pipe(tap((valor) => console.log(valor.status)));
  }
}
