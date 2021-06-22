import { Component, OnInit } from '@angular/core';
import { Vehicle } from 'src/app/interfaces/vehicle';
import { VehicleService } from 'src/app/services/vehicle.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  listVehicles: Vehicle[] = []
  // Id of vehicle to delete
  id:string = ''
  isLoading: boolean = true

  constructor(private _vehicleService: VehicleService) { }

  ngOnInit(): void {
    this.getVehicles()
  }

  setId(vehicle: Vehicle){
    if (vehicle.vehicleId) {
      this.id = vehicle.vehicleId
    }
  }

  getVehicles(){
    this._vehicleService.getListVehicle().subscribe(data => {
      this.listVehicles = data
      this.isLoading = false
    },error => {
      this.isLoading = false
      console.log(error);
    })
    
  }

  deleteVehicle(){
    this.isLoading = true
    if (this.id !== '') {
      this._vehicleService.deleteVehicle(this.id).subscribe(data =>{
        this.getVehicles()
        this.isLoading = false
      },error => {
        console.log(error);
      })
    }
  }
}
