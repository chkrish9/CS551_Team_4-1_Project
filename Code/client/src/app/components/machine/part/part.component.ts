import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-part',
  templateUrl: './part.component.html',
  styleUrls: ['./part.component.css']
})
export class PartComponent implements OnInit {
  part = {
    "name": "",
    "description": "",
    "qrCode":""
  };
  parts: any;
  isList: boolean = true;
  isNew: boolean = true;
  constructor() { }

  ngOnInit() {
  }

  new() {
    this.isList = false;
    this.isNew = true;
    this.part = {
      "name": "",
      "description": "",
      "qrCode":""
    };
  }
  back() {
    this.isList = true;
  }
  populate(part) {
    this.isList = false;
    this.isNew = false;
    this.part = part;
  }

  getParts() {
    
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

  generateQR() {
    this.part.qrCode = "{ partName :" + this.part.name + "}";
  }

  print() {
    let printContents, popupWin;
    printContents = document.getElementById('print-section').innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <title>Print tab</title>
          <style>
          //........Customized style.......
          </style>
        </head>
    <body onload="window.print();window.close()">${printContents}</body>
      </html>`
    );
    popupWin.document.close();
  }

}
