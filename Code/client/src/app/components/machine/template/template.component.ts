import { Component, OnInit } from '@angular/core';
import { MachineService } from '../../../services/machine/machine.service';
import { ReasonService } from '../../../services/machine/reason.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {
  template = {
    "name": "",
    "description": "",
    "reason": "",
    "equipent": ""
  };
  documents: any;
  isList: boolean = true;
  isNew: boolean = true;
  equipentList: any;
  reasonList: any;

  /*Auto complete variables start */
  search: string;
  searchResults: any;
  showResults: boolean;
  /*Auto complete variables end */

  constructor(
    private machineService: MachineService,
    private reasonService: ReasonService
  ) {
    this.machineService.getMachines().subscribe(data => {
      this.equipentList = data;
    });
    this.reasonService.getAllReasons().subscribe(data => {
      this.reasonList = data;
    });
  }

  ngOnInit() {
  }

  new() {
    this.isList = false;
    this.isNew = true;
    this.template = {
      "name": "",
      "description": "",
      "reason": "",
      "equipent": ""
    };
  }
  back() {
    this.isList = true;
  }
  populate(template) {
    this.isList = false;
    this.isNew = false;
    this.template = template;
  }

  getSteps() {

  }

  save() {

  }
  delete() {

  }
  update() {

  }
  cancel() {
    this.isList = true;
  }

   /*Auto complete methods start */
   onSearchChange(value) {
    if (value.length > 2) {
      // this.userService.getUserName(value).subscribe(data => {
      //   this.showResults = true;
      //   this.searchResults = data;
      //   console.log(data);
      // });
    }
  }

  selectedItem(item) {
    this.search = item.username;
    this.showResults = false;
  }

  addUserToUserGroup(searchTerm) {
    let user = this.searchResults.filter(function (el) {
      return el.username === searchTerm;
    })[0];
    this.search = "";
    //this.usergroup.users.push(user);
  }
  deleteUser(user) {
    // this.usergroup.users = this.usergroup.users.filter(function (el) {
    //   return el._id !== user._id;
    // });
  }
  /*Auto complete methods end */
}
