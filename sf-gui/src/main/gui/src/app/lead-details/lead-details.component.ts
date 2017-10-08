import { Component, OnInit } from '@angular/core';
import { trigger,state,style,transition,animate,keyframes } from '@angular/animations';
import { ActivatedRoute, Router, Params, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-lead-details',
  templateUrl: './lead-details.component.html',
  styleUrls: ['./lead-details.component.scss']
})
export class LeadDetailsComponent implements OnInit {

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
