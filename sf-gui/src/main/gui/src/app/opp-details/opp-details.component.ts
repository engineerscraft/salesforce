import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-opp-details',
  templateUrl: './opp-details.component.html',
  styleUrls: ['./opp-details.component.scss']
})
export class OppDetailsComponent implements OnInit {

  private displayedSection = 'Details';
  private pubKey;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute
    .paramMap
    .subscribe(params => {
      this.pubKey = params.get('pubKey');
    });
  }

  changeView() {
    if(this.displayedSection === 'Details') {
      this.displayedSection = 'Updates';
    } else {
      this.displayedSection = 'Details';
    }
  }
}
