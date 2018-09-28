import { Component, OnInit } from '@angular/core';
import { AreaService } from '../../../services/machine/area.service';
import { LineService } from '../../../services/machine/line.service';

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.css']
})
export class AreaComponent implements OnInit {
  area = {
    "name": "",
    "description": "",
    "lines": []
  };
  areas: any;
  isList: boolean = true;
  isNew: boolean = true;
  search: string;
  searchResults:any;
  showResults:boolean;
  constructor(
    private areaService: AreaService,
    private lineService: LineService
  ) {
    this.getAreas();
  }

  ngOnInit() {
  }

  new() {
    this.isList = false;
    this.isNew = true;
    this.area = {
      "name": "",
      "description": "",
      "lines": []
    };
  }
  back() {
    this.isList = true;
  }
  populate(area) {
    this.isList = false;
    this.isNew = false;
    this.area = area;
  }

  onSearchChange(value) {
    if (value.length > 2) {
      this.lineService.getLineName(value).subscribe(data => {
        this.showResults = true;
        this.searchResults = data;
        console.log(data);
      });
    }
  }

  selectedItem(item){
    this.search = item.name;
    this.showResults =false;
  }

  addLineToArea(searchTerm){
    let line =this.searchResults.filter(function(el){
        return el.name === searchTerm;
    })[0];
    this.search = "";
    this.area.lines.push(line);
  }

  deleteLine(line){
    this.area.lines = this.area.lines.filter(function(el){
      return el._id !== line._id;
    });
  }
  getAreas() {
    this.areaService.getAreas().subscribe(data => {
      this.areas = data;
    });
  }

  save() {
    this.areaService.addArea(this.area).subscribe(data => {
      this.isList = true;
      this.getAreas();
    });
  }
  delete() {
    this.areaService.deleteArea(this.area["_id"]).subscribe(data => {
      this.isList = true;
      this.getAreas();
    });
  }
  update() {
    this.areaService.updateArea(this.area).subscribe(data => {
      this.isList = true;
      this.getAreas();
    });
  }
  cancel() {
    this.isList = true;
  }


}
