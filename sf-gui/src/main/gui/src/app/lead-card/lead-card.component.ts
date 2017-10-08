import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-lead-card',
  templateUrl: './lead-card.component.html',
  styleUrls: ['./lead-card.component.scss']
})
export class LeadCardComponent implements OnInit {

  @Input() pubKey = '';
  @Input() title = '';
  @Input() quotePrice = '';
  @Input() status = '';

  constructor() { }

  ngOnInit() { }

}
