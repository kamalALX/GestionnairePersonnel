import { Component, OnInit } from '@angular/core';
import {EmployeeService} from "../../services/employeeService/employee.service";
import {Employee} from "../../entities/employee/Employee";

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor( private employeeService:EmployeeService) { }
  employees:Employee[]=[];

  ngOnInit(): void {
    this.loadpatient();
  }

  loadpatient():void{
    this.employeeService.getAllEmployee().subscribe(  (response) => {

      console.log(this.employees);
        this.employees = response;
      },
      (error) => {
        console.error('Error loading patient:', error);
      }
    );
  }


  protected readonly Employee = Employee;
}
