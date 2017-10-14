import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  private isNavbarCollapsed = true;
  private division = 'All';
  private divisions;

  constructor(private router : Router) { }

  ngOnInit() { }

  logOff() {
    localStorage.clear();
    this.router.navigate([""]);
  }
}
