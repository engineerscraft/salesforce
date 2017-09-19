import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-contact-card',
  templateUrl: './contact-card.component.html',
  styleUrls: ['./contact-card.component.scss']
})
export class ContactCardComponent implements OnInit {

  @Input() pubKey = '';
  @Input() fName = '';
  @Input() mName = '';
  @Input() lName = '';
  @Input() email = '';
  @Input() desig = '';
  @Input() company = '';
  @Input() mob = '';
  @Input() land = '';
  @Input() extn = '';
  
  private cName = ''

  constructor() { }

  ngOnInit() {
    this.cName = this.fName + ' ' + (this.mName?this.mName + ' ':'') + this.lName;
  }

}
