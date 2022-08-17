import { AuthenticationService } from './../../authorization/services/authentication.service';
import { VehicledataService } from '../dashboard/services/vehicle-data.service';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Veiculo, Veiculos } from '../dashboard/models/VehiclesInterface';
import {
  tap,
  switchMap,
  filter,
  debounceTime,
  distinctUntilChanged,
} from 'rxjs/operators';
import { VehicleService } from './services/vehicle.service';
import { TokenService } from 'src/app/authorization/services/token.service';

const ESPERA_DIGITACAO = 400;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  veiculos: Veiculos = [];
  selecionado: Veiculo | undefined;
  idSelecionado = 1;
  testeInput = new FormControl();

  testes$ = this.testeInput.valueChanges.pipe(
    debounceTime(ESPERA_DIGITACAO),

    filter(
      (valorDigitado) => valorDigitado.length >= 15 || !valorDigitado.length
    ),
    distinctUntilChanged(),
    switchMap((valorDigitado) =>
      this.vehicleDataService.getVehicleData(valorDigitado)
    )
  );

  constructor(
    private vehicleService: VehicleService,
    private vehicleDataService: VehicledataService,
    private authService: TokenService
  ) {
    this.vehicleService.getVeiculos().subscribe((retornoAPI) => {
      this.veiculos = retornoAPI;
      this.selecionado = this.veiculos[0];
    });
  }

  teste(e: any) {
    this.selecionado = this.veiculos[e.value - 1];
  }

  mudanca(valor: any) {
    console.log(valor);
  }

  retornaToken() {
    return this.authService.getToken();
  }
}
