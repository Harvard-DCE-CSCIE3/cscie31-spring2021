import { Component, OnInit } from '@angular/core';
import { PhotoService } from './photo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ PhotoService ]
})
export class AppComponent {
  constructor(private photoService:PhotoService){
  }

  photoList = null;
  coursename = 'CSCI E31';

  numPhotos:number = 3; //  this.photoList.length;

  totalVotes:number = 0;
  mostRecentVotedOn:string = '';
  handleUpvoted(e):void{
    console.log("app-component gets upvoted:" + e);
    this.totalVotes += 1;
    this.mostRecentVotedOn = e;
  }
  ngOnInit() {
      this.photoList = this.photoService.listPhotos();
  }

}
