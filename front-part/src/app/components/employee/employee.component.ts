import { Component, OnInit } from '@angular/core';
import {EmployeeService} from "../../services/employeeService/employee.service";
import {Employee} from "../../entities/employee/Employee";
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor( 
    private employeeService:EmployeeService,
    public router: Router
  ) { }
  employees:any[]=[];
  currentemployee: any = JSON.parse(localStorage.getItem('currentemployee') || '{}');
  ngOnInit(): void {
    this.listemploye();
  }

  detailemployee(employee:any){
    localStorage.removeItem('currentemployee');
    localStorage.setItem('currentemployee', JSON.stringify(employee));
    this.router.navigate(['/detailemployee']);
  }
  editemployee(employee:any){
    localStorage.removeItem('currentemployee');
    localStorage.setItem('currentemployee', JSON.stringify(employee));
    this.router.navigate(['/updateEmployee']);
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
