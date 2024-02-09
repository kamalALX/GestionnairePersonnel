import {NgModule } from '@angular/core';
import {RouterModule, Routes } from '@angular/router';
import {CommonModule} from "@angular/common";
import {EmployeeComponent} from "./components/employee/employee.component";
import {AddEmployeeComponent} from "./components/add-employee/add-employee.component";
import {UpdateEmployeeComponent} from "./components/update-employee/update-employee.component";
import { DetailemployeeComponent } from './components/detailemployee/detailemployee.component';

const routes: Routes = [
  { path: 'employee', component:    EmployeeComponent },
  { path: 'addEmployee', component: AddEmployeeComponent },
  { path: 'updateEmployee', component: UpdateEmployeeComponent },
  { path: 'detailemployee', component:  DetailemployeeComponent}
];

@NgModule({
  imports: [CommonModule,RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
