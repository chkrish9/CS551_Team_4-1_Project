import { Component, OnInit } from '@angular/core';
import { DocumentService } from '../../../services/machine/document.service';
import { ToasterService, Toast } from 'angular2-toaster';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css']
})
export class DocumentComponent implements OnInit {

  document = {
    "name": "",
    "description": ""
  };
  documents: any;
  isList: boolean = true;
  isNew: boolean = true;
  constructor(
    private documentService: DocumentService,
    private toasterService: ToasterService
  ) {
    this.getDocuments();
  }

  ngOnInit() {
  }

  new() {
    this.isList = false;
    this.isNew = true;
    this.document = {
      "name": "",
      "description": ""
    };
  }
  back() {
    this.isList = true;
  }
  populate(document) {
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
    if (this.line.name !== "" && this.line.description !== "") {
      this.lineService.addLine(this.line).subscribe(data => {
        var toast: Toast = {
          type: 'success',
          title: 'Success',
          body: 'Line saved successfully.',
          showCloseButton: true
        };
        this.toasterService.pop(toast);
        this.isList = true;
        this.getLines();
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
    this.lineService.deleteLine(this.line["_id"]).subscribe(data => {
      var toast: Toast = {
        type: 'success',
        title: 'Success',
        body: 'Line deleted successfully.',
        showCloseButton: true
      };
      this.toasterService.pop(toast);
      this.isList = true;
      this.getLines();
    });
  }
  update() {
    this.lineService.updateLine(this.line).subscribe(data => {
      var toast: Toast = {
        type: 'success',
        title: 'Success',
        body: 'Line updated successfully.',
        showCloseButton: true
      };
      this.toasterService.pop(toast);
      this.isList = true;
      this.getLines();
    });
  }
  cancel() {
    this.isList = true;
  }

}
