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

const ESPERA_DIGITACAO = 400;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  veiculos: Veiculos = [];
  selecionado: Veiculo | undefined;
  idSelecionado = 0;
  testeInput = new FormControl();

  testes$ = this.testeInput.valueChanges.pipe(
    debounceTime(ESPERA_DIGITACAO),
    // tap(() => {
    //   console.log('Fluxo do Filtro');
    // }),
    // tap(console.log),
    filter(
      (valorDigitado) => valorDigitado.length >= 5 || !valorDigitado.length
    ),
    distinctUntilChanged(),
    switchMap((valorDigitado) =>
      this.vehicleDataService.getVehicleData(valorDigitado)
    )
    // tap(console.log)
  );

  constructor(
    private vehicleService: VehicleService,
    private vehicleDataService: VehicledataService
  ) {
    this.vehicleService.getVeiculos().subscribe((retornoAPI) => {
      this.veiculos = retornoAPI.vehicles;
      this.selecionado = this.veiculos[0];
    });
  }

  teste(e: any) {
    this.selecionado = this.veiculos[e];
  }

  mudanca(valor: any) {
    console.log(valor);
  }
}
