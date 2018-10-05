import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { tokenNotExpired } from 'angular2-jwt';
import { Observable } from 'rxjs';
import { Privillages } from './privillages';
import { _ } from 'underscore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authToken: any;
  isDev: boolean;
  user: any;
  privillages: any;

  constructor(
    private http: HttpClient,
    private pri: Privillages
  ) {
    this.isDev = true;
  }

  authenticateUser(user) {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    let url = this.prepEndpoint('login/authenticate');
    return this.http.post(url, user, { headers: headers });
  }

  storeUserData(token, user, privillages) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', (typeof (user) === "string") ? user : JSON.stringify(user));
    localStorage.setItem('privillages', JSON.stringify(privillages));
    this.authToken = token;
    this.user = user;
    this.privillages = privillages;
  }

  loggedIn() {
    this.loadToken();
    return tokenNotExpired(null, this.authToken);
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  getToken(){
    return localStorage.getItem('id_token');
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  checkPrivilege(routename) {
    var privillages = JSON.parse(localStorage.getItem('privillages'));
    if (privillages.indexOf(routename) > -1)
      return true;
  }

  hasPrevillage(homeroute) {
    var privillages = JSON.parse(localStorage.getItem('privillages'));
    var routes = this.pri.getPrivillages().filter(function (el) {
      return el.group === homeroute
    });
    var count = routes.filter(function (el) {
      return privillages.indexOf(el.name) > -1;
    }).length;
    return count > 0
  }

  getUsername() {
    return JSON.parse(localStorage.getItem('user'));
  }

  getSideMenuPage(route) {
    var routes = this.pri.getPrivillages().filter(function (el) {
      return el.group === route
    });
    var pr = _.sortBy(routes, 'order');
    var privillages = JSON.parse(localStorage.getItem('privillages'));
    var menu = pr.filter(function (el) {
      return privillages.indexOf(el.name) > -1;
    })[0];
    this.storeRoute(route);
    return menu;
  }
  storeRoute(route) {
    localStorage.setItem('current_route', route);
  }

  isRouteDisplay(route) {
    if (route === localStorage.getItem('current_route')) {
      return true;
    } else {
      return false;
    }
  }

  prepEndpoint(ep) {
    if (!this.isDev) {
      return ep;
    } else {
      return 'http://localhost:3000/' + ep;
    }
  }

}
