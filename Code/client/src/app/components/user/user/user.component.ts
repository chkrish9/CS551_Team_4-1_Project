import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user = {
    "firstName": "",
    "lastName": "",
    "email": "",
    "phone": "",
    "username": "",
    "password": "",
    "dateOfJoin": "",
    "cnfpassword": ""
  };
  users: any;
  isList : boolean = true;
  isNew : boolean = true;
  constructor(
    private userService: UserService
  ) 
  {
    this.getAllUsers();
  }

  ngOnInit() {
  }

  new(){
    this.isList = false;
    this.isNew = true;
    this.user = {
      "firstName": "",
      "lastName": "",
      "email": "",
      "phone": "",
      "username": "",
      "password": "",
      "dateOfJoin": "",
      "cnfpassword": ""
    };
  }
  back(){
    this.isList = true;
  }
  populate(user) {
    this.isList = false;
    this.isNew = false;
    this.user = user;
  }

  getAllUsers() {
    this.userService.getUsers().subscribe(data => {
      this.users = data;
    });
  }

  save() {
    this.userService.addUser(this.user).subscribe(data => {
      this.isList = true;
      this.getAllUsers();
    });
  }
  delete() {
    this.userService.deleteUser(this.user["_id"]).subscribe(data => {
      this.isList = true;
      this.getAllUsers();
    });
  }
  update() {
    this.userService.updateUser(this.user).subscribe(data => {
      this.isList = true;
      this.getAllUsers();
    });
  }
  cancel() {
    this.isList = true;
  }
}
