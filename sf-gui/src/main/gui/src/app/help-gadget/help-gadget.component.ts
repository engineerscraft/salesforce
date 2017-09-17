import { Component, OnInit, Input } from '@angular/core';
import { trigger,state,style,transition,animate,keyframes } from '@angular/animations';

@Component({
  selector: 'app-help-gadget',
  templateUrl: './help-gadget.component.html',
  styleUrls: ['./help-gadget.component.scss'],
  animations: [
    trigger('helpGadgetAnimation', [
      transition(':enter', [
        style({opacity: 0}),
        animate('500ms', style({opacity: 1}))
      ])
    ])
  ]  
})
export class HelpGadgetComponent implements OnInit {

  @Input() helpHeader = ''; 
  @Input() helpText = '';

  private state = 'invisible';
  
  constructor() { }

  ngOnInit() {
    this.state = 'visible';
  }

}
