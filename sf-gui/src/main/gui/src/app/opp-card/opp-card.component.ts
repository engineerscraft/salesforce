import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-opp-card',
  templateUrl: './opp-card.component.html',
  styleUrls: ['./opp-card.component.scss']
})
export class OppCardComponent implements OnInit {

  @Input() pubKey = '';
  @Input() title = '';
  @Input() quotePrice = '';
  @Input() status = '';
  
  constructor() { }

  ngOnInit() {
  }

}
