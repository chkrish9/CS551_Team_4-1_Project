import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/common/auth.service';
import { Router } from '@angular/router';
import { MachineService } from '../../services/machine/machine.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  machines: any;
  machine:string="";
  schedule:string="";
  constructor(
    private authService:AuthService,
    private router:Router,
    private machineService: MachineService,
  ) {
    var menu=this.authService.getSideMenuPage("home");
    this.router.navigate([menu.name]);
    this.machineService.getMachines().subscribe(data => {
      this.machines = data;
    });
   }

  ngOnInit() {

  }

}
