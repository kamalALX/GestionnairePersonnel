import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Employee} from "../../entities/employee/Employee";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private apiUrl = 'http://localhost:8082/api/employee';

  constructor(private http: HttpClient) { }

  getAllEmployee(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiUrl);
  }

  getEmployeeById(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.apiUrl}/${id}`);
  }

  addEmployee(patientDTO: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.apiUrl, patientDTO);
  }

  updateEmployee(patientDTO: Employee): Observable<Employee> {
    return this.http.put<Employee>(this.apiUrl, patientDTO);
  }

  //getallPDF

  deleteEmployee(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
