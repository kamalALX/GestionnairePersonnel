import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnvService {
  API_URL = 'http://localhost:8082/api/employee/'
  constructor() { }
}
