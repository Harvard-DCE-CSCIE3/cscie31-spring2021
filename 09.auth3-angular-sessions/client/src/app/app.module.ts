import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule,  HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthHttpInterceptor } from './authHttpInterceptor';

import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
    { path: '', component: AppComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    RouterModule.forRoot(
      routes
    ),
    HttpClientModule
  ],
  exports: [
    RouterModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
