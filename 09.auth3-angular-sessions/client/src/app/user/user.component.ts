import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [UserService]

})
export class UserComponent implements OnInit {

  user = null;

  constructor(private userService:UserService) { }

  ngOnInit() {
    this.userService.getCurrentUser().subscribe((user)=>{
      this.user = user;
      console.log(this.user);
    });
  }
}
