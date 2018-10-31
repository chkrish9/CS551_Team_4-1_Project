import { Component, OnInit } from '@angular/core';
import { StepgroupService } from '../../../services/machine/stepgroup.service';
import { DocumentService } from '../../../services/machine/document.service';
import { PartService } from '../../../services/machine/part.service';
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
    "steps": []
  };
  stepgroups: any;
  steps: any;
  step = {
    "name": "",
    "description": "",
    "parts": [],
    "documents": []
  };
  isList: boolean = true;
  isNew: boolean = true;

  /*Auto complete variables start */
  documentsearch: string;
  documentsearchResults: any;
  documentshowResults: boolean;
  partsearch: string;
  partsearchResults: any;
  partshowResults: boolean;
  /*Auto complete variables end */
  constructor(
    private stepgroupService: StepgroupService,
    private documentService: DocumentService,
    private partService: PartService,
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
      "steps": []
    };
    this.step = {
      "name": "",
      "description": "",
      "parts": [],
      "documents": []
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
    } else {
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
  onSearchChange(value, modulename) {
    if (value.length > 2 && modulename === "document") {
      this.documentService.getDocumentName(value).subscribe(data => {
        this.documentshowResults = true;
        this.documentsearchResults = data;
        console.log(data);
      });
    } else if (value.length > 2) {
      this.partService.getPartName(value).subscribe(data => {
        this.partshowResults = true;
        this.partsearchResults = data;
        console.log(data);
      });
    }
  }

  selectedItem(item, modulename) {
    if (modulename === "document") {
      this.documentsearch = item.name;
      this.documentshowResults = false;
    } else {
      this.partsearch = item.name;
      this.partshowResults = false;
    }
  }

  addDocumentToStep(searchTerm) {
    let document = this.documentsearchResults.filter(function (el) {
      return el.name === searchTerm;
    })[0];
    this.documentsearch = "";
    this.step.documents.push(document);
  }

  addPartToStep(searchTerm) {
    let part = this.partsearchResults.filter(function (el) {
      return el.name === searchTerm;
    })[0];
    this.partsearch = "";
    this.step.parts.push(part);
  }

  deleteDocument(document) {
    this.step.documents = this.step.documents.filter(function (el) {
      return el._id !== document._id;
    });
  }

  deletePart(part) {
    this.step.parts = this.step.parts.filter(function (el) {
      return el._id !== part._id;
    });
  }

  newStep(){
    this.step = {
      "name": "",
      "description": "",
      "parts": [],
      "documents": []
    };
  }

  addStepToStepGroup(){
    this.stepgroup.steps.push(this.step);
  }
  /*Auto complete methods end */

}
