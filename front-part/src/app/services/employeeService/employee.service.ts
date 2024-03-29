import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Employee} from "../../entities/employee/Employee";
import { tap } from 'rxjs/operators';
import { EnvService } from './env.service';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private apiUrl = 'http://localhost:8082/api/employee';
  private citiesUrl = 'https://my-json-server.typicode.com/chigivera/villes-maroc-api/cities';


  constructor(
    private http: HttpClient,
    private env: EnvService,
    ) { }

    getAllEmployee(lien: any, obj: any) {
      return this.http.get<any>(this.env.API_URL + lien, obj).pipe(
        tap((returnObj) => {
          return returnObj;
        })
      );
    }
  // getAllEmployee(): Observable<Employee[]> {
  //   return this.http.get<Employee[]>(this.apiUrl);
  // }

  // getEmployeeById(id: number): Observable<Employee> {
  //   return this.http.get<Employee>(`${this.apiUrl}/${id}`);
  // }

  // addEmployee(patientDTO: Employee): Observable<Employee> {
  //   return this.http.post<Employee>(this.apiUrl, patientDTO);
  // }
  getEmployeeById(lien: any, obj: any) {
    return this.http.get<any>(this.env.API_URL + lien, obj).pipe(
      tap((returnObj) => {
        return returnObj;
      })
    );
  }
  getEmployee(lien: any, obj: any) {
    return this.http.get<any>(this.env.API_URL + lien, obj).pipe(
      tap((returnObj) => {
        return returnObj;
      })
    );
  }
  addEmployee(patientDTO: any, obj: any) {
    return this.http.post<any>(this.env.API_URL + patientDTO, obj).pipe(
      tap((returnObj) => {
        return returnObj;
      })
    );
  }

  // updateEmployee(patientDTO: Employee): Observable<Employee> {
  //   return this.http.put<Employee>(this.apiUrl, patientDTO);
  // }
  updateEmployee(lien: any, obj: any) {
    return this.http.put<any>(this.env.API_URL + lien, obj).pipe(
      tap((returnObj) => {
        return returnObj;
      })
    );
  }
  downloadPdf(endpoint: string): Observable<Blob> {
    return this.http.get(this.env.API_URL + endpoint, { responseType: 'blob' });
  }
  deleteEmployee(lien: any, obj: any) {
    return this.http.delete<any>(this.env.API_URL + lien, obj).pipe(
      tap((returnObj) => {
        return returnObj;
      })
    );
  }
  getCities(): Observable<any[]> {
    return this.http.get<any[]>(this.citiesUrl);
  }
  uploadPdf(lien: any, obj: any) {
    return this.http.put<any>(this.env.API_URL + lien, obj).pipe(
      tap((returnObj) => {
        return returnObj;
      })
    );
  }

  //getallPDF

  // deleteEmployee(id: number): Observable<any> {
  //   return this.http.delete(`${this.apiUrl}/${id}`);
  // }
}
