import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../services/common/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public isCollapsed = true;
  constructor(
    private authService:AuthService,
    private router:Router
  ) { }

  ngOnInit() {
  }

  onLogoutClick(){
    this.authService.logout();
    console.log("Logout");
    this.router.navigate(['/']);
    return false;
  }
  updateMenu(route){
    this.authService.storeRoute(route);
  }
}
