import { AddVehicledataService } from './add-vehicledata.service';
import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/authorization/services/token.service';
import { VehicleData } from '../dashboard/models/VehicleDataInterface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vehicledata',
  templateUrl: './vehicledata.component.html',
  styleUrls: ['./vehicledata.component.css'],
})
export class VehicledataComponent implements OnInit {
  newVehicleData: VehicleData;
  vin: string = '';
  odometer: string = '';
  tirePressure: string = '';
  status: string = '';
  batteryStatus: string = '';
  fuelLevel: string = '';
  latitude: string = '';
  longitude: string = '';

  constructor(
    private addVehicledataService: AddVehicledataService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  addVehicleData() {
    console.log(this.vin);
    this.addVehicledataService
      .addVehicleData({
        vin: this.vin,
        odometer: this.odometer,
        status: this.status,
        fuelLevel: this.fuelLevel,
        batteryStatus: this.batteryStatus,
        longitude: this.longitude,
        latitude: this.latitude,
        tirePressure: this.tirePressure,
      })
      .subscribe(
        () => {
          this.router.navigate(['home/dashboard']);
        },
        (error) => {
          alert('Email or password incorrect!');
          console.log(error);
        }
      );
  }
}
