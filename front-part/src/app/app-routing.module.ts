import {NgModule } from '@angular/core';
import {RouterModule, Routes } from '@angular/router';
import {CommonModule} from "@angular/common";
import {EmployeeComponent} from "./components/employee/employee.component";
import {AddEmployeeComponent} from "./components/add-employee/add-employee.component";
import {UpdateEmployeeComponent} from "./components/update-employee/update-employee.component";

const routes: Routes = [{ path: 'employee', component:    EmployeeComponent },
  { path: 'addEmployee', component: AddEmployeeComponent },
  { path: 'updateEmployee/:id', component: UpdateEmployeeComponent }];

@NgModule({
  imports: [CommonModule,RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
