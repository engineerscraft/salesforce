import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { DivisionService } from '../division.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  private isNavbarCollapsed = true;
  private division = 'All';
  private divisions;

  constructor(private router : Router, private divisionService: DivisionService) { }

  ngOnInit() {
    this.divisionService.getDivisions()
      .subscribe(
        data => {
          this.divisions = data;
        }
      );
    if(localStorage.getItem('DIVISION_DES')) {
      this.division = localStorage.getItem('DIVISION_DES');
    }
  }

  logOff() {
    localStorage.clear();
    this.router.navigate([""]);
  }

  setDivision(div) {
    this.division = div.des;
    localStorage.setItem('DIVISION_PUB_KEY', div.pubKey);
    localStorage.setItem('DIVISION_DES', div.des);
  }
}
