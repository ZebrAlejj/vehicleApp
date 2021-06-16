import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Vehicle } from 'src/app/interfaces/vehicle';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  addVehicle: FormGroup;
  

  constructor(private fb: FormBuilder) { 
    this.addVehicle = this.fb.group({
      id: [, Validators.required],
      type: ['', Validators.required],
      manufacturerNameShort: ['', Validators.required],
      price: [, Validators.required]
    })
  }

  ngOnInit(): void {
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

  onVehicleSubmit() {
    const vehicle: Vehicle = {
      id: this.addVehicle.get('id')?.value,
      type: this.addVehicle.get('type')?.value,
      manufacturerNameShort: this.addVehicle.get('manufacturerNameShort')?.value,
      price: this.addVehicle.get('price')?.value
    };
    console.log(vehicle);
  }

}
