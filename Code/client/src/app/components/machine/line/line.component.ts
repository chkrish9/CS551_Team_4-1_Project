import { Component, OnInit } from '@angular/core';
import { LineService } from '../../../services/machine/line.service';

@Component({
  selector: 'app-line',
  templateUrl: './line.component.html',
  styleUrls: ['./line.component.css']
})
export class LineComponent implements OnInit {

  line = {
    "name": "",
    "description": ""
  };
  lines: any;
  isList : boolean = true;
  isNew : boolean = true;
  constructor(
    private lineService: LineService
  ) 
  {
    this.getLines();
  }

  ngOnInit() {
  }

  new(){
    this.isList = false;
    this.isNew = true;
    this.line = {
      "name": "",
      "description": ""
    };
  }
  back(){
    this.isList = true;
  }
  populate(line) {
    this.isList = false;
    this.isNew = false;
    this.line = line;
  }

  getLines() {
    this.lineService.getLines().subscribe(data => {
      this.lines = data;
    });
  }

  save() {
    this.lineService.addLine(this.line).subscribe(data => {
      this.isList = true;
      this.getLines();
    });
  }
  delete() {
    this.lineService.deleteLine(this.line["_id"]).subscribe(data => {
      this.isList = true;
      this.getLines();
    });
  }
  update() {
    this.lineService.updateLine(this.line).subscribe(data => {
      this.isList = true;
      this.getLines();
    });
  }
  cancel() {
    this.isList = true;
  }

}
