import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-steps',
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.css']
})
export class StepsComponent implements OnInit {
  stepgroup = {
    "name": "",
    "description": "",
  };
  steps: any;
  isList: boolean = true;
  isNew: boolean = true;

   /*Auto complete variables start */
   search: string;
   searchResults: any;
   showResults: boolean;
   /*Auto complete variables end */
  constructor() { }

  ngOnInit() {
  }

  new() {
    this.isList = false;
    this.isNew = true;
    this.stepgroup = {
      "name": "",
      "description": "",
    };
  }
  back() {
    this.isList = true;
  }
  populate(stepgroup) {
    this.isList = false;
    this.isNew = false;
    this.stepgroup = stepgroup;
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
