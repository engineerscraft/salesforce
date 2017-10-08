import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-account-card',
  templateUrl: './account-card.component.html',
  styleUrls: ['./account-card.component.scss']
})
export class AccountCardComponent implements OnInit {

  @Input() title = '';
  @Input() pubKey = '';
  @Input() soldPrice = '';

  constructor() { }

  ngOnInit() {
  }

}
