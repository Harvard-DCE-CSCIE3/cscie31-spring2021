import { Component, OnInit } from '@angular/core';
import { PhotoService } from '../photo.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css'],
  providers: [PhotoService]  // adding PhotoService to 'providers' is what makes it a 'service'
})
export class GalleryComponent implements OnInit {

    // will be initialize to the length of photoList in ngOnInit
    numPhotos = 0;

    // Returns numPhotos - here simply to show that we can make
    //  a method call in a template expression
    getNumberOfPhotos(){
      return this.numPhotos;
    }

    // counter that will increment every time a upvote happens in a child component
    totalVotes:number = 0;
    // tracks photo most recently voted on
    mostRecentVotedOn:string = '';
    // bound to upvotedEvent of child components in app.component template
    handleUpvoted(e):void{
      console.log("app-component gets upvoted:" + e);
      this.totalVotes += 1;
      this.mostRecentVotedOn = e;
    }

    // Because it was added as a provider to this class in the decorator,
    //  Angular will initialize and pass a PhotoService object
    //  into the constructor. We have assigned it the local property name 'photoService'
    constructor(private photoService:PhotoService){
    }

    photoList = null;
    photoUrl = '';
    // runs when the component is fully set up, gets photo data from service
    ngOnInit() {
      this.updatePhotoList();
      this.photoUrl = this.photoService.photoUrl;
    }
    updatePhotoList():void{
      this.photoService.listPhotos().subscribe((photos)=>{
        this.photoList = photos;
        this.numPhotos = this.photoList.length;
      });
    }
}
