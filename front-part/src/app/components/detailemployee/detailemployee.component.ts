import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/employeeService/employee.service';

@Component({
  selector: 'app-detailemployee',
  templateUrl: './detailemployee.component.html',
  styleUrls: ['./detailemployee.component.css']
})
export class DetailemployeeComponent implements OnInit {
  fileName: string;

  currentemployee: any = JSON.parse(localStorage.getItem('currentemployee') || '{}');
  constructor(
    private employeeService:EmployeeService,
  ) { }

  ngOnInit(): void {
    console.log(this.currentemployee);
  }

  downloadpdf(id: number): void {
    this.employeeService.downloadPdf('downloadPdf/' + id).subscribe(
      (response: Blob) => {
        const blob = new Blob([response], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        window.open(url); // Open the PDF in a new tab
      },
      (err: HttpErrorResponse) => {
        console.error('Erreur lors du téléchargement du PDF', err);
        if (err.error instanceof ErrorEvent) {
          // Client-side error
          console.error('An error occurred:', err.error.message);
        } else {
          // Server-side error
          console.error(
            `Backend returned code ${err.status}, ` +
            `body was: ${err.error}`);
        }
      }
    );
  }
  
}
