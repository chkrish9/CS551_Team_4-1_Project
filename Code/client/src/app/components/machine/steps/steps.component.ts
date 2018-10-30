import { Component, OnInit } from '@angular/core';
import { StepgroupService } from '../../../services/machine/stepgroup.service';
import { ToasterService, Toast } from 'angular2-toaster';

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
  stepgroups: any;
  steps: any;
  step= {
    "name": "",
    "description": "",
  };
  isList: boolean = true;
  isNew: boolean = true;

  /*Auto complete variables start */
  search: string;
  searchResults: any;
  showResults: boolean;
  /*Auto complete variables end */
  constructor(
    private stepgroupService: StepgroupService,
    private toasterService: ToasterService
  ) {
    this.getStepGroups();
   }

  ngOnInit() {
  }

  new() {
    this.isList = false;
    this.isNew = true;
    this.stepgroup = {
      "name": "",
      "description": "",
    };
    this.step = {
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

  getStepGroups() {
    this.stepgroupService.getAllStepgroups().subscribe(data => {
      this.stepgroups = data;
    });
  }

  save() {
    if (this.stepgroup.name !== "" && this.stepgroup.description !== "") {
      this.stepgroupService.addStepgroup(this.stepgroup).subscribe(data => {
        var toast: Toast = {
          type: 'success',
          title: 'Success',
          body: 'Stepgroup saved successfully.',
          showCloseButton: true
        };
        this.toasterService.pop(toast);
        this.isList = true;
        this.getStepGroups();
      });
    }else{
      var toast: Toast = {
        type: 'error',
        title: 'Error',
        body: 'Please fill the all the details.',
        showCloseButton: true
      };
      this.toasterService.pop(toast);
    }
  }
  delete() {
    this.stepgroupService.deleteStepgroup(this.stepgroup["_id"]).subscribe(data => {
      var toast: Toast = {
        type: 'success',
        title: 'Success',
        body: 'Stepgroup deleted successfully.',
        showCloseButton: true
      };
      this.toasterService.pop(toast);
      this.isList = true;
      this.getStepGroups();
    });
  }
  update() {
    this.stepgroupService.updateStepgroup(this.stepgroup).subscribe(data => {
      var toast: Toast = {
        type: 'success',
        title: 'Success',
        body: 'Stepgroup updated successfully.',
        showCloseButton: true
      };
      this.toasterService.pop(toast);
      this.isList = true;
      this.getStepGroups();
    });
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
