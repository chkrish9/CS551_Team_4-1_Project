import { Component, OnInit } from '@angular/core';
import { ReasonService } from '../../../services/machine/reason.service';

@Component({
  selector: 'app-reasons',
  templateUrl: './reasons.component.html',
  styleUrls: ['./reasons.component.css']
})
export class ReasonsComponent implements OnInit {

  reason = {
    "name": "",
    "description": ""
  };
  reasons: any;
  isList : boolean = true;
  isNew : boolean = true;
  constructor(
    private reasonService: ReasonService
  ) 
  {
    this.getAllReasons();
  }

  ngOnInit() {
  }

  new(){
    this.isList = false;
    this.isNew = true;
    this.reason = {
      "name": "",
      "description": ""
    };
  }
  back(){
    this.isList = true;
  }
  populate(reason) {
    this.isList = false;
    this.isNew = false;
    this.reason = reason;
  }

  getAllReasons() {
    this.reasonService.getAllReasons().subscribe(data => {
      this.reasons = data;
    });
  }

  save() {
    this.reasonService.addReason(this.reason).subscribe(data => {
      this.isList = true;
      this.getAllReasons();
    });
  }
  delete() {
    this.reasonService.deleteReason(this.reason["_id"]).subscribe(data => {
      this.isList = true;
      this.getAllReasons();
    });
  }
  update() {
    this.reasonService.updateReason(this.reason).subscribe(data => {
      this.isList = true;
      this.getAllReasons();
    });
  }
  cancel() {
    this.isList = true;
  }
}
