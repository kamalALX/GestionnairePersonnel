import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as intITelInput from 'intl-tel-input';
import { EmployeeService } from 'src/app/services/employeeService/employee.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent implements OnInit {
  currentemployee: any = JSON.parse(localStorage.getItem('currentemployee') || '{}');
  Personneform: FormGroup;
  constructor(
    private apidb: EmployeeService,
  ) { 
    this.Personneform = new FormGroup({
      cin: new FormControl('', [Validators.required]),
      cnss: new FormControl('', [Validators.required]),
      niveauxdetude: new FormControl('', [Validators.required]),
      situationfam: new FormControl('', [Validators.required]),
      ville: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      jobtitle: new FormControl('', [Validators.required]),
    });
  }

  getform() {
    if (this.currentemployee) {
      this.Personneform.get('cin')?.setValue(this.currentemployee.cin);
      this.Personneform.get('niveauxdetude')?.setValue(this.currentemployee.niveauEtude);
      this.Personneform.get('situationfam')?.setValue(this.currentemployee.situationFamillle);
      this.Personneform.get('ville')?.setValue(this.currentemployee.city);
      this.Personneform.get('address')?.setValue(this.currentemployee.address);
      this.Personneform.get('phone')?.setValue(this.currentemployee.phone);
      this.Personneform.get('cnss')?.setValue(this.currentemployee.cnss);
      this.Personneform.get('name')?.setValue(this.currentemployee.name);
      this.Personneform.get('email')?.setValue(this.currentemployee.email);
      this.Personneform.get('jobtitle')?.setValue(this.currentemployee.jobtitle);
    }
  }
  ngOnInit(): void {
   
    const inputElement = document.getElementById('phone');
    if (inputElement){
      const iti = intITelInput(inputElement,{
        initialCountry: 'MA',
        separateDialCode:true,
        utilsScript:'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/11.0.0/js/utils.js'
      });
      const selectedCountryData = iti.getSelectedCountryData();
      console.log(selectedCountryData.dialCode); 
    }
    this.getform();
    console.log(this.currentemployee.address);
  }

  modifierEmployee() {
    this.currentemployee.cin = this.Personneform.get('cin')?.value;
    this.currentemployee.niveauEtude = this.Personneform.get('niveauxdetude')?.value;
    this.currentemployee.situationFamillle = this.Personneform.get('situationfam')?.value;
    this.currentemployee.city = this.Personneform.get('ville')?.value;
    this.currentemployee.address = this.Personneform.get('address')?.value;
    this.currentemployee.phone = this.Personneform.get('phone')?.value;
    this.currentemployee.cnss = this.Personneform.get('cnss')?.value;
    this.currentemployee.name = this.Personneform.get('name')?.value;
    this.currentemployee.email = this.Personneform.get('email')?.value;
    this.currentemployee.jobtitle = this.Personneform.get('jobtitle')?.value;
    if (this.Personneform.valid) {
      this.apidb.updateEmployee('update/'+ this.currentemployee.id, this.currentemployee).subscribe(
        (data: any) => {
          Swal.fire('', 'Employee modifiée avec succés', 'success');
          console.log(this.currentemployee);
        },
        (err: any) => {
          Swal.fire('Erreur de modification...', err.error.msg, 'error');
        }
      );
    }
    
    else {
      console.log(this.currentemployee.id);
      Swal.fire('Erreur...', 'Erreur de paramètres', 'error');
    }
  }
}
