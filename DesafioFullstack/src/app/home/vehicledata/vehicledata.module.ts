import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehicledataRoutingModule } from './vehicledata-routing.module';
import { VehicledataComponent } from './vehicledata.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [VehicledataComponent],
  imports: [CommonModule, VehicledataRoutingModule, SharedModule, FormsModule],
})
export class VehicledataModule {}
