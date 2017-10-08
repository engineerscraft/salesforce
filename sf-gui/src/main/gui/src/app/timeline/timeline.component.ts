import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommentService } from '../comment.service';

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
  private comments;
  private commentFormGroup;
  private startPos;
  private allCommentsShown;

  @Input() entityPubKey;
  @Output() changeView = new EventEmitter<any>();
  constructor(private formBuilder: FormBuilder, private commentService: CommentService) { }

  ngOnInit() {

    this.commentFormGroup = this.formBuilder.group({
      note: ['', [Validators.required]],
      entityPubKey: [this.entityPubKey]
    });

    this.commentService.getComments(this.entityPubKey, 0).subscribe(
      res => {
        this.comments = res;
      }
    )
  }

  submit() {
    this.commentService.createComment(this.commentFormGroup.value)
      .subscribe(
      res => {
        this.commentService.getComments(this.entityPubKey, 0).subscribe(
          res => {
            this.comments = res;
          }
        )
      }
      );
  }

  changeViewDisplay() {
    this.changeView.emit();
  }

  more() {
    if (this.startPos < this.comments.length) {
      this.startPos = this.startPos + 10;
      this.commentService.getComments(this.entityPubKey, this.startPos).subscribe(
        res => {
          res.array.forEach(element => {
            this.comments.push(element);
          });
        }
      )
    }
    else {
      if(!this.allCommentsShown) {
        this.allCommentsShown = true;
      }
    }
  }
}
