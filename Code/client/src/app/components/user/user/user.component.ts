import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user ={
    "firstName":"",
    "lastName":"",
    "email":"",
    "phone":"",
    "username":"",
    "password":"",
    "dateOfJoin":"",
    "cnfpassword":""
  }
  constructor(
    private userService:UserService
  ) { }

  ngOnInit() {
  }

  save(){
    console.log(this.user);
    console.log(this.user.dateOfJoin);
    this.userService.addUser(this.user).subscribe(data => {
      console.log(data);
    });
  }
}
