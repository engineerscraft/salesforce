import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-salesrep-card',
  templateUrl: './salesrep-card.component.html',
  styleUrls: ['./salesrep-card.component.scss']
})
export class SalesrepCardComponent implements OnInit {

  @Input() pubKey = '';
  @Input() fName = '';
  @Input() mName = '';
  @Input() lName = '';
  @Input() email = '';
  @Input() desig = '';
  @Input() mob = '';
  @Input() land = '';
  @Input() extn = '';
  
  private cName = ''

  constructor() { }

  ngOnInit() {
    this.cName = this.fName + ' ' + (this.mName?this.mName + ' ':'') + this.lName;
  }

}
