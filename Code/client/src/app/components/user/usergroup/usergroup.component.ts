import { Component, OnInit, ViewChild } from '@angular/core';
import { Privillages } from '../../../services/common/privillages';
import { UsergroupService } from '../../../services/user/usergroup.service';

@Component({
  selector: 'app-usergroup',
  templateUrl: './usergroup.component.html',
  styleUrls: ['./usergroup.component.css']
})
export class UsergroupComponent implements OnInit {

  usergroup = {
    "name": "",
    "description": "",
    "users": [],
    "privillages": []
  };
  privillagesList:any;
  usergroups: any;
  isList: boolean = true;
  isNew: boolean = true;
  constructor(
    private privillages: Privillages,
    private usergroupService: UsergroupService
  ) {
    this.getAllUserGroups();
    this.privillagesList = privillages.getPrivillages();
  }

  ngOnInit() {
  }
  new() {
    this.isList = false;
    this.isNew = true;
    this.usergroup = {
      "name": "",
      "description": "",
      "users": [],
      "privillages": []
    };
  }

  back() {
    this.isList = true;
  }
  populate(usergroup) {
    this.isList = false;
    this.isNew = false;
    this.usergroup = usergroup;
    this.updatePrivillages(this.usergroup.privillages);
  }

  updatePrivillages(privillages){
    this.privillagesList.forEach(element => {
      privillages.forEach(el => {
        if(el == element.name){
          element.set = true;
        }
      });
    });
  }

  addUserToUserGroup(){
    //Need to add user
  }
  privillageSelected(priv) {
    if (this.usergroup.privillages.indexOf(priv.name) < 0)
    {
      this.usergroup.privillages.push(priv.name);
      priv.set = true;
    }
    else
    {
      this.usergroup.privillages.splice(this.usergroup.privillages.indexOf(priv.name), 1);
      priv.set = false;
    }
  }

  getAllUserGroups() {
    this.usergroupService.getUserGroups().subscribe(data => {
      this.usergroups = data;
    });
  }

  save() {
    this.usergroupService.addUserGroup(this.usergroup).subscribe(data => {
      this.isList = true;
      this.getAllUserGroups();
    });
  }

  deleteUser(user){
    this.usergroup.users = this.usergroup.users.filter(function(el){
      return el._id !== user._id;
    });
  }

  delete() {
    this.usergroupService.deleteUserGroup(this.usergroup["_id"]).subscribe(data => {
      this.isList = true;
      this.getAllUserGroups();
    });
  }

  update() {
    this.usergroupService.updateUserGroup(this.usergroup).subscribe(data => {
      this.isList = true;
      this.getAllUserGroups();
    });
  }

  cancel() {
    this.isList = true;
  }
}
