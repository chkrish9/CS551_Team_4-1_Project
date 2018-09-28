import { Component, OnInit } from '@angular/core';
import { MachinegroupService } from '../../../services/machine/machinegroup.service';

@Component({
  selector: 'app-machinegroup',
  templateUrl: './machinegroup.component.html',
  styleUrls: ['./machinegroup.component.css']
})
export class MachinegroupComponent implements OnInit {

  machinegroup = {
    "name": "",
    "description": ""
  };
  machinegroups: any;
  isList : boolean = true;
  isNew : boolean = true;
  constructor(
    private machinegroupService: MachinegroupService
  ) 
  {
    this.getAllMachineGroups();
  }

  ngOnInit() {
  }

  new(){
    this.isList = false;
    this.isNew = true;
    this.machinegroup = {
      "name": "",
      "description": ""
    };
  }
  back(){
    this.isList = true;
  }
  populate(machinegroup) {
    this.isList = false;
    this.isNew = false;
    this.machinegroup = machinegroup;
  }

  getAllMachineGroups() {
    this.machinegroupService.getMachineGroups().subscribe(data => {
      this.machinegroups = data;
    });
  }

  save() {
    this.machinegroupService.addMachineGroup(this.machinegroup).subscribe(data => {
      this.isList = true;
      this.getAllMachineGroups();
    });
  }
  delete() {
    this.machinegroupService.deleteMachineGroup(this.machinegroup["_id"]).subscribe(data => {
      this.isList = true;
      this.getAllMachineGroups();
    });
  }
  update() {
    this.machinegroupService.updateMachineGroup(this.machinegroup).subscribe(data => {
      this.isList = true;
      this.getAllMachineGroups();
    });
  }
  cancel() {
    this.isList = true;
  }

}
