import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { trigger,state,style,transition,animate,keyframes } from '@angular/animations';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss'],
  animations: [
    trigger('enterAnimation', [
      transition(':enter', [
        style({ transform: 'translateX(-5%)', opacity: 0 }),
        animate('500ms', style({ transform: 'translateX(0)', opacity: 1 }))
      ]),
      transition(':leave', [
        style({ transform: 'translateX(0)', opacity: 1 }),
        animate('500ms', style({ transform: 'translateX(5%)', opacity: 0 }))
      ])
    ])
  ]
})
export class TimelineComponent implements OnInit {

  private message;
  private formTitle = 'Lead Updates';

  @Output() changeView = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
  }

  changeViewDisplay() {
    this.changeView.emit();
  }

}
