import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Vehicle } from 'src/app/interfaces/vehicle';
import { VehicleService } from 'src/app/services/vehicle.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  addVehicle: FormGroup;
  action = 'Create'
  id:string = ''
  vehicle: Vehicle | undefined
  
  constructor(private fb: FormBuilder,
              private _vehicleService: VehicleService,
              private router: Router,
              private aRoute: ActivatedRoute) { 

    this.addVehicle = this.fb.group({
      type: ['', Validators.required],
      manufacturerNameShort: ['', Validators.required],
      price: ['', Validators.compose([Validators.required, Validators.min(1000)])]
    })
    
    this.id = this.aRoute.snapshot.paramMap.get('id')!
  }

  ngOnInit(): void {

    this.isEdit()
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event:any) {
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          }
          form.classList.add('was-validated')
      }, false)
    })
  }

  isEdit(){
    if (this.id) {
      this.action = 'Edit'
      this._vehicleService.getVehicle(this.id).subscribe(data => {
        this.vehicle = data
        this.addVehicle.patchValue({
          type: data.type,
          manufacturerNameShort : data.manufacturerNameShort,
          price: data.price
        })
        
      },error => {
        console.log(error);
      })
    }
  }

  onVehicleSubmit() {

    if (this.vehicle == undefined) {
      //Create new vehicle
      const vehicle: Vehicle = {
        type: this.addVehicle.get('type')?.value,
        manufacturerNameShort: this.addVehicle.get('manufacturerNameShort')?.value,
        price: this.addVehicle.get('price')?.value.toFixed(2)
      };
      // console.log(this.addVehicle.invalid);
      
      this._vehicleService.addVehicle(vehicle).subscribe(data => {
        this.router.navigate(['/'])
      },error => {
        console.log(error);
      })
    } else{
      //Edit vehicle
      // TODO: refactorize
      const vehicle: Vehicle = {
        vehicleId: this.id,
        type: this.addVehicle.get('type')?.value,
        manufacturerNameShort: this.addVehicle.get('manufacturerNameShort')?.value,
        price: this.addVehicle.get('price')?.value.toFixed(2)
      };
      
      this._vehicleService.updateVehicle(vehicle).subscribe(data => {
        console.log(data);
        
        this.router.navigate(['/'])
      },error => {
        console.log(error);
      })
    }

   
  }

}
