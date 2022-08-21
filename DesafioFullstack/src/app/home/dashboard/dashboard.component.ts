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
import { VehicleData } from './models/VehicleDataInterface';

const ESPERA_DIGITACAO = 400;
declare var google: any;

let conectados = 1;
let notConectados = 1;
let atualizados = 1;
let notAtualizados = 1;
let dados = [];
let dados2 = [];

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  veiculos: Veiculos = [];
  selecionado: Veiculo | undefined;
  idSelecionado = 1;
  testeInput = new FormControl();
  vehiclesData: VehicleData[];
  vehicleDataSelecionado: VehicleData | undefined;

  testes$ = this.testeInput.valueChanges.pipe(
    debounceTime(ESPERA_DIGITACAO),
    filter((valorDigitado) => valorDigitado.length >= 4),
    distinctUntilChanged(),
    switchMap(
      (valorDigitado) =>
        this.vehiclesData.filter((array) => array.vin.includes(valorDigitado))
      // this.vehicleDataService.getVehicleData(valorDigitado)
    ),
    tap((value) => console.log(value)),
    tap((value) => (this.vehicleDataSelecionado = value))
  );

  constructor(
    private vehicleService: VehicleService,
    private vehicleDataService: VehicledataService,
    private authService: TokenService
  ) {
    this.vehicleService.getVeiculos().subscribe((retornoAPI) => {
      this.veiculos = retornoAPI;
      this.selecionado = this.veiculos[0];
      conectados = +this.selecionado.connected;
      notConectados = +this.selecionado.sold - +this.selecionado.connected;
      atualizados = +this.selecionado.softwareUpdates;
      notAtualizados =
        +this.selecionado.sold - +this.selecionado.softwareUpdates;
      dados = [
        ['Conectados', +conectados],
        ['Não conectados', notConectados],
      ];
      dados2 = [
        ['Atualizados', +atualizados],
        ['Não Atualizados', notAtualizados],
      ];
      this.init();
    });

    this.vehicleDataService.getVehicleData().subscribe((retornoAPI) => {
      this.vehiclesData = retornoAPI;
      console.log(this.vehiclesData);
    });
  }
  ngOnInit(): void {}
  init() {
    if (typeof google !== 'undefined') {
      google.charts.load('current', { packages: ['corechart'] });
      setTimeout(() => {
        google.charts.setOnLoadCallback(this.exibirGraficos());
      }, 500);
    }
  }
  exibirGraficos(): any {
    this.exibirDonutChart();
    this.exibirDonutChart2();
  }
  exibirDonutChart() {
    const el = document.getElementById('donut_chart');
    const chart = new google.visualization.PieChart(el);
    const opcoes = this.obterOpcoes();

    opcoes['pieHole'] = 0.3;
    chart.draw(this.obterDataTable(), opcoes);
  }

  exibirDonutChart2() {
    const el = document.getElementById('donut_chart2');
    const chart = new google.visualization.PieChart(el);
    const opcoes = this.obterOpcoes();

    opcoes['pieHole'] = 0.3;
    chart.draw(this.obterDataTable2(), opcoes);
  }

  obterDataTable(): any {
    const data = new google.visualization.DataTable();

    data.addColumn('string', 'Mês');
    data.addColumn('number', 'Quantidade');
    data.addRows(dados);

    return data;
  }

  obterDataTable2(): any {
    const data = new google.visualization.DataTable();

    data.addColumn('string', 'Mês');
    data.addColumn('number', 'Quantidade');
    data.addRows(dados2);

    return data;
  }
  obterOpcoes() {
    return {
      width: 400,
      height: 300,
    };
  }

  teste(e: any) {
    // let value = Math.trunc((e.value - 4) / 10);
    // console.log(value, 'value');

    this.selecionado = this.veiculos[e.value - 1];
    conectados = +this.selecionado.connected;
    notConectados = +this.selecionado.sold - +this.selecionado.connected;
    atualizados = +this.selecionado.softwareUpdates;
    notAtualizados = +this.selecionado.sold - +this.selecionado.softwareUpdates;
    dados = [
      ['Conectados', +conectados],
      ['Não conectados', notConectados],
    ];
    dados2 = [
      ['Atualizados', +atualizados],
      ['Não Atualizados', notAtualizados],
    ];

    this.init();
  }

  mudanca(valor: any) {
    console.log(valor);
  }

  retornaToken() {
    return this.authService.getToken();
  }
}
