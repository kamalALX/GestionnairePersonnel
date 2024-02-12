import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from 'src/app/services/employeeService/employee.service';
import Swal from 'sweetalert2';
import * as intITelInput from 'intl-tel-input';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})

export class AddEmployeeComponent implements OnInit {

  Personneform: FormGroup;
  submitted = false;
  cities: any[] = []; 
  selectedCity: string = ''; 
  constructor(
    private apidb: EmployeeService,
  )
  {
    this.Personneform = new FormGroup({
      cin: new FormControl('', [Validators.required]),
      cnss: new FormControl('', [Validators.required]),
      niveauxdetude: new FormControl('', [Validators.required]),
      situationfam: new FormControl('', [Validators.required]),
      ville: new FormControl('', [Validators.required]),
      adresse: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      jobtitle: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    try {
      this.fetchCities(); // Fetch cities on component initialization
    } catch (error:any) {
      console.log("there has been an error: " +error)
    }
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
  }
  fetchCities() {
    this.apidb.getCities().subscribe(
      (data) => {
        console.log('Cities data:', data); // Log the data received from the API
        this.cities = data;
        console.log('Cities:', this.cities); // Log the assigned cities array
      },
      (error) => {
        console.error('Error fetching cities:', error);
      }
    );
  }
  
  onSubmit() {
    this.submitted = true;

    if (this.Personneform.invalid) {
      return;
    }

    // Form submission logic
  }
  ajouterPersonne() {
    if (this.Personneform.valid) {
      const inputElement = document.getElementById('phone');
    
        const iti = intITelInput(inputElement,{
          initialCountry: 'MA',
          separateDialCode:true,
          utilsScript:'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/11.0.0/js/utils.js'
        });
        
        const selectedCountryData = iti.getSelectedCountryData();
        console.log(selectedCountryData.dialCode); 
  
     var cin= this.Personneform.get('cin')?.value;
     var niveauxdetude= this.Personneform.get('niveauxdetude')?.value;
     var situationfam= this.Personneform.get('situationfam')?.value;
     var ville= this.Personneform.get('ville')?.value;
     var adresse= this.Personneform.get('adresse')?.value;
     var phone= this.Personneform.get('phone')?.value;
     var cnss= this.Personneform.get('cnss')?.value;
    var name = this.Personneform.get('name')?.value;
    var email = this.Personneform.get('email')?.value;
    var jobtitle = this.Personneform.get('jobtitle')?.value;
      //-------------
      this.apidb.addEmployee('create', {
        "cin":cin,
        "niveauEtude":niveauxdetude,
        "situationFamillle":situationfam,
        "city":ville,
        "address":adresse,
        "phone":'+' + selectedCountryData.dialCode +''+ phone,
        "cnss":cnss,
        "name": name,
        "email": email,
        "jobtitle": jobtitle,
      }).subscribe(
        (data) => {
          Swal.fire('', 'Personne ajouté avec succés', 'success');
          this.Personneform.reset();
        },
        err => {
          Swal.fire('', 'Erreur d\'ajout', 'error');
        }
      );


    }
    // else {
    //   Swal.fire('', 'Erreur de paramètres', 'warning');
    // }
  }
  listeEmploe()
  {
    this.apidb.getAllEmployee('employee', {}).subscribe(
      (data) => {
        Swal.fire('', 'Personne ajouté avec succés', 'success');
        console.log(data);

        this.Personneform.reset();
      },
      err => {
        Swal.fire('', 'Erreur d\'ajout', 'error');
      }
    );
  }
}
