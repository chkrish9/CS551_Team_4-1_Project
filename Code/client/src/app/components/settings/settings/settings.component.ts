import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  categoryList = [
    {
      "value":"email",
      "key":"Email Configuration"
    }
  ];
  category:string="";
  constructor() { }

  ngOnInit() {
  }

  save(){

  }
  cancel(){

  }
}
