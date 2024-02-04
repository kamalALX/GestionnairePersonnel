import { Component, OnInit } from '@angular/core';
import {EmployeeService} from "../../services/employeeService/employee.service";
import {Employee} from "../../entities/employee/Employee";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor( private employeeService:EmployeeService) { }
  employees:Employee[]=[];

  ngOnInit(): void {
    this.listemploye();
  }

  listemploye()
  {
    // this.employeeService.getAllEmployee('employee').subscribe((response) => {

    //   console.log(this.employees);
    //     this.employees = response;
    //   },
    //   (error) => {
    //     console.error('Error loading patient:', error);
    //   }
    // );
    this.employeeService.getAllEmployee('', {  }).subscribe((dataemployee: any) => {
      this.employees = dataemployee;
      console.log(dataemployee);
    },
      (err: any) => {
        Swal.fire('Erreur', 'Erreur de chargement des données', 'error');
      }
    );
  }
}
