import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detailemployee',
  templateUrl: './detailemployee.component.html',
  styleUrls: ['./detailemployee.component.css']
})
export class DetailemployeeComponent implements OnInit {
  currentemployee: any = JSON.parse(localStorage.getItem('currentemployee') || '{}');
  constructor() { }

  ngOnInit(): void {
    console.log(this.currentemployee);
  }

}
