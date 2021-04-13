import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { PhotoComponent } from './photo/photo.component';
import { GalleryComponent } from './gallery/gallery.component';

import { RouterModule, Routes } from '@angular/router';
import { PhotodetailComponent } from './photodetail/photodetail.component';
import { FormsModule } from '@angular/forms';
import { NewphotoComponent } from './newphoto/newphoto.component';

const routes:Routes = [
  { path: '', redirectTo: '/gallery', pathMatch: 'full'},
  { path: 'gallery', component: GalleryComponent },
  { path: 'photo/:id', component: PhotodetailComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    PhotoComponent,
    GalleryComponent,
    PhotodetailComponent,
    NewphotoComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(
      routes
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
