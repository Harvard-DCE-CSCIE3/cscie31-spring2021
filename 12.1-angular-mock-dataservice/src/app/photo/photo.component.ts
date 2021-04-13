import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css']
})
export class PhotoComponent implements OnInit {

  @Input() photo;
  @Output() upvotedEvent = new EventEmitter<string>();
  votes:number = 0;

  constructor() {
  }

  upvote(title):void{
    console.log(title);
    this.votes+=1;
    this.upvotedEvent.emit(title);
  }

  ngOnInit(){}

}
