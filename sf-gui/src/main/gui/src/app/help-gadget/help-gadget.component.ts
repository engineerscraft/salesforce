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
      ]),
      transition(':leave', [
        style({transform: 'rotateX(0)', opacity: 1}),
        animate('500ms', style({transform: 'rotateX(90deg)', opacity: 0}))
      ])      
    ])
  ]  
})
export class HelpGadgetComponent implements OnInit {

  @Input() helpHeader = ''; 
  @Input() helpText = '';
  @Input() background = 'bg-success'

  private state = 'invisible';
  
  constructor() { }

  ngOnInit() {
    this.state = 'visible';
  }

}
