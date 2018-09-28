import { Component, OnInit } from '@angular/core';
import { MachineService } from '../../../services/machine/machine.service';
import { AreaService } from '../../../services/machine/area.service';
import { LineService } from '../../../services/machine/line.service';
import { MachinegroupService } from '../../../services/machine/machinegroup.service';

@Component({
  selector: 'app-machine',
  templateUrl: './machine.component.html',
  styleUrls: ['./machine.component.css']
})
export class MachineComponent implements OnInit {

  machine = {
    "name": "",
    "machinegroup": "",
    "company":"",
    "model":"",
    "dateOfInstall":"",
    "qrCode":"",
    "area":"",
    "line":"",
    "barcode":""
  };
  machines: any;
  isList : boolean = true;
  isNew : boolean = true;
  areaList:any;
  lineList:any;
  machinegroupList:any;
  constructor(
    private machineService: MachineService,
    private areaService: AreaService,
    private lineService: LineService,
    private machinegroupService: MachinegroupService
  ) 
  {
    this.getMachines();
    this.areaService.getAreas().subscribe(data => {
      this.areaList = data;
    });
    this.lineService.getLines().subscribe(data => {
      this.lineList = data;
    });
    this.machinegroupService.getMachineGroups().subscribe(data => {
      this.machinegroupList = data;
    });
  }

  ngOnInit() {
  }

  new(){
    this.isList = false;
    this.isNew = true;
    this.machine = {
      "name": "",
      "machinegroup": "",
      "company":"",
      "model":"",
      "dateOfInstall":"",
      "qrCode":"",
      "area":"",
      "line":"",
      "barcode":""
    };
  }
  back(){
    this.isList = true;
  }
  populate(machine) {
    this.isList = false;
    this.isNew = false;
    this.machine = machine;
  }

  getMachines() {
    this.machineService.getMachines().subscribe(data => {
      this.machines = data;
    });
  }
  generateQR(){
    this.machine.qrCode = "{ machineName :"+this.machine.name +",area:" +this.machine.area+",line:"+this.machine.line+"}" ;
  }
  save() {
    this.machineService.addMachine(this.machine).subscribe(data => {
      this.isList = true;
      this.getMachines();
    });
  }
  delete() {
    this.machineService.deleteMachine(this.machine["_id"]).subscribe(data => {
      this.isList = true;
      this.getMachines();
    });
  }
  update() {
    this.machineService.updateMachine(this.machine).subscribe(data => {
      this.isList = true;
      this.getMachines();
    });
  }
  cancel() {
    this.isList = true;
  }
}
