import { TestBed } from '@angular/core/testing';

import { AddVehicledataService } from './add-vehicledata.service';

describe('AddVehicledataService', () => {
  let service: AddVehicledataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddVehicledataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
