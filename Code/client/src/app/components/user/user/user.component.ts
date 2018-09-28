import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  usergroup = {
    "name": "",
    "description": "",
    "users": [],
    "privillages": []
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
    this.usergroup = {
      "name": "",
      "description": "",
      "users": [],
      "privillages": []
    };
  }
  back(){
    this.isList = true;
  }
  populate(usergroup) {
    this.isList = false;
    this.isNew = false;
    this.usergroup = usergroup;
  }

  getAllUsers() {
    this.userService.getUsers().subscribe(data => {
      this.users = data;
    });
  }

  save() {
    this.userService.addUser(this.usergroup).subscribe(data => {
      this.isList = true;
      this.getAllUsers();
    });
  }
  delete() {
    this.userService.deleteUser(this.usergroup["_id"]).subscribe(data => {
      this.isList = true;
      this.getAllUsers();
    });
  }
  update() {
    this.userService.updateUser(this.usergroup).subscribe(data => {
      this.isList = true;
      this.getAllUsers();
    });
  }
  cancel() {
    this.isList = true;
  }
}
