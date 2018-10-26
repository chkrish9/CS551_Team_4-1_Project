import { Component, OnInit } from '@angular/core';
import { FileSelectDirective, FileUploader } from 'ng2-file-upload';
import { saveAs } from 'file-saver';
import { AuthService } from '../../../services/common/auth.service';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css']
})
export class DocumentComponent implements OnInit {
  uploader: FileUploader;
  document = {
    "name": "",
    "description": ""
  };
  documents: any;
  isList: boolean = true;
  isNew: boolean = true;
  constructor( private authService: AuthService) { 
    this.uploader = new FileUploader({ url: this.authService.prepEndpoint('/upload') });
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
    this.document = document;
  }

  getDocuments() {
    
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
}
