import { Component, OnInit } from '@angular/core';
import {EmployeeService} from "../../services/employeeService/employee.service";
import {Employee} from "../../entities/employee/Employee";
import Swal from 'sweetalert2';

import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  searchQuery: string = ''; // Property to store the search query
  frmrecherche: FormGroup;
  recherche: any;
  listeemployeerecherche: never[];
  constructor( 
    private employeeService:EmployeeService,
    public router: Router
  ) { 
    this.frmrecherche = new FormGroup({
      recherche: new FormControl(''),
    })
  }
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
  supprimer(employee: any) {
    Swal.fire({
      title: "Supprimer la ligne",
      html:
        "Voulez-vous vraiment supprimer? ",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "Annuler",
      confirmButtonText: "Supprimer"
    }).then(result => {
      this.employeeService.deleteEmployee('delete/'+ employee.id, employee).subscribe(
        (data: any) => {
          Swal.fire('', 'Employee supprimer avec succés', 'success');
          console.log(this.currentemployee);
          this.employeeService.getAllEmployee('', {  }).subscribe((dataemployee: any) => {
            this.employees = dataemployee;
            console.log(dataemployee);
          },
            (err: any) => {
              Swal.fire('Erreur', 'Erreur de chargement des données', 'error');
            }
          );
        },
        (err: any) => {
          Swal.fire('Erreur de suppression...', err.error.msg, 'error');
        }
      );
    });
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
  Onchange() {
    var rech = '%' + this.recherche + '%';
    this.employeeService.getEmployee('' + this.currentemployee.id, { recherche: rech }).subscribe((dataemployee: any) => {
      this.employees = dataemployee;
      console.log(dataemployee);
    },
      (err: any) => {
        Swal.fire('Erreur', 'Erreur de chargement des données', 'error');
      }
    );
  }
  fetchAllEmployees() {
    this.employeeService.getAllEmployee('', {}).subscribe(
      (dataemployee: any) => {
        this.employees = dataemployee;
      },
      (err: any) => {
        console.error('Error fetching employees:', err);
        Swal.fire('Error', 'Failed to load employee data', 'error');
      }
    );
  }

  // Function to handle search
  search() {
      const rech = this.frmrecherche.get('recherche_cin')?.value;
      // Call the API endpoint with the search query
      this.employeeService.getEmployeeById('',{recherche: rech }).subscribe(
        (searchResults: any) => {
          this.employees = searchResults;
          console.log(this.searchQuery);
          searchResults = this.listeemployeerecherche.filter(
            (p: any) => p.numcommande.indexOf(rech) > -1);
          
        },
        (error: any) => {
          console.error('Error searching employees:', error);
          Swal.fire('Error', 'Failed to search employees', 'error');
        }
      );

  }

  

}
