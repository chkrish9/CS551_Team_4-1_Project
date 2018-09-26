import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/common/header/header.component';
import { LoginComponent } from './components/login/login.component';

import { AuthGuard } from './guards/auth.guard';
import { AuthService } from './services/common/auth.service';
import { HomeComponent } from './components/home/home.component';
import { UserComponent } from './components/user/user.component';
import { UsergroupComponent } from './components/usergroup/usergroup.component';
import { MachineComponent } from './components/machine/machine.component';

const appRoutes : Routes = [
  {path : '', component: LoginComponent },
  {path : 'home', component: HomeComponent, canActivate:[AuthGuard] },
  {path : 'user', component: UserComponent, canActivate:[AuthGuard] },
  {path : 'usergroup', component: UsergroupComponent, canActivate:[AuthGuard] },
  {path : 'machine', component: MachineComponent, canActivate:[AuthGuard] },
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    HomeComponent,
    UserComponent,
    UsergroupComponent,
    MachineComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [
    AuthService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
