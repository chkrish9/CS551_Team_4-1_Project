import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-usergroup',
  templateUrl: './usergroup.component.html',
  styleUrls: ['./usergroup.component.css']
})
export class UsergroupComponent implements OnInit {
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
  constructor() { }

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
}
