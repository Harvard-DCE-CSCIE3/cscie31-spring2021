import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PhotoService } from '../photo.service';

@Component({
  selector: 'app-photodetail',
  templateUrl: './photodetail.component.html',
  styleUrls: ['./photodetail.component.css'],
  providers: [ PhotoService ]
})
export class PhotodetailComponent implements OnInit {
  // local photo object fetched from PhotoService
  photo:any;
  // photo image uri with server path prepended
  photodisplayurl:string='';
  // flag for edit mode
  editing:boolean=false;

  constructor(private route: ActivatedRoute,
              private router: Router, 
              private photoService:PhotoService ) { }

  ngOnInit() {
    this.getPhoto();
  }

  // bound to edit and cancel buttons in view
  setEditMode(mode):void{
    this.editing = (mode ? true : false);
  }

  // retreives route parameter and fetches data from data service
  getPhoto(): void{
     const param = this.route.snapshot.paramMap.get('id');
     this.photoService.getPhoto(param)
      .subscribe((photo) => {
        this.photo = photo;
        this.photodisplayurl = this.photoService.photoUrl + this.photo.imageurl;
      });
  }

  // calls update from PhotoService using data passed from ngForm.value
  updatePhoto(obj:any):void {
    this.photo.title = obj.titleField;
    this.photo.description = obj.descField;
    this.photoService.updatePhoto(this.photo._id, this.photo)
      .subscribe((result)=>{
        location.reload();
    });
  }

  // deletes photo using PhotoService
  deletePhoto(){
    if (confirm(`Are you sure you want to delete ${this.photo.title}?`)){
      console.log(`deleting ${this.photo._id}`);
      this.photoService.deletePhoto(this.photo._id)
        .subscribe((result)=>{
          alert(`Photo ${this.photo.title} has been deleted`);
          this.router.navigate(['/gallery']);
        })
      }
  }
}
