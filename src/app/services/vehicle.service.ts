import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Vehicle } from '../interfaces/vehicle';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  private myAppUrl = 'https://localhost:44387/'
  private myApiUrl = 'vehicles/'

  constructor(private http: HttpClient) { }

  getListVehicle(): Observable<any> {
    return this.http.get(this.myAppUrl + this.myApiUrl)
  }

  getVehicle(id: string): Observable<any>{
    return this.http.get(this.myAppUrl + this.myApiUrl + id)
  }

  deleteVehicle(id: string): Observable<any> {
    return this.http.delete(this.myAppUrl + this.myApiUrl + id)
  }

  addVehicle(vehicle:Vehicle): Observable<any> {
    return this.http.post(this.myAppUrl + this.myApiUrl, vehicle)
  }

  updateVehicle(vehicle:Vehicle): Observable<any> {
    return this.http.put(this.myAppUrl + this.myApiUrl, vehicle )
  }
}
