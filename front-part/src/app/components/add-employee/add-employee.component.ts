import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from 'src/app/services/employeeService/employee.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  Personneform: FormGroup;

  constructor(
    private apidb: EmployeeService,
  )
  {
    this.Personneform = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      jobtitle: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
  }

  ajouterPersonne() {
    if (this.Personneform.valid) {
      var name = this.Personneform.get('name')?.value;
      var email = this.Personneform.get('email')?.value;
      var jobtitle = this.Personneform.get('jobtitle')?.value;
      //-------------
      this.apidb.addEmployee('create', {
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
