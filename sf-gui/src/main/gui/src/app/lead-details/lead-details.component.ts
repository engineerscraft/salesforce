import { Component, OnInit } from '@angular/core';
import { trigger,state,style,transition,animate,keyframes } from '@angular/animations';

@Component({
  selector: 'app-lead-details',
  templateUrl: './lead-details.component.html',
  styleUrls: ['./lead-details.component.scss']
})
export class LeadDetailsComponent implements OnInit {

  private displayedSection = 'Details';

  constructor() { }

  ngOnInit() {
  }

  changeView() {
    if(this.displayedSection === 'Details') {
      this.displayedSection = 'Updates';
    } else {
      this.displayedSection = 'Details';
    }
  }

}
