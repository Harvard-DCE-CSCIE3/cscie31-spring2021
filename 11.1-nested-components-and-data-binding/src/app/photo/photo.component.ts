import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css']
})
export class PhotoComponent implements OnInit {

  // photo passed in from app-photo tag of app.component
  @Input() photo;
    // upvotedEvent bound in app-photo tag, will trigger a function in app,component
  @Output() upvotedEvent = new EventEmitter<string>();
  // counter of upvotes on this photo
  votes:number = 0;

  constructor() {
  }

  // bound in photo.component template to click of Upvote! button
  upvote(title):void{
    console.log(title);
    this.votes+=1;
    this.upvotedEvent.emit(title);
  }

  ngOnInit() {
  }

}
