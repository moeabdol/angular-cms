import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { FlashMessagesModule } from 'angular2-flash-messages';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PagesComponent } from './components/pages/pages.component';
import { RegisterComponent } from './components/register/register.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignoutComponent } from './components/signout/signout.component';
import { AdminPagesComponent } from './components/admin-pages/admin-pages.component';
import { AdminNavbarComponent } from './components/admin-navbar/admin-navbar.component';
import { AdminAddPageComponent } from './components/admin-add-page/admin-add-page.component';

import { PageService } from './services/page.service';
import { UserService } from './services/user.service';

const appRoutes: Routes = [
  { path: 'signup', component: RegisterComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'signout', component: SignoutComponent },
  { path: 'admin/pages', component: AdminPagesComponent },
  { path: 'admin/add-page', component: AdminAddPageComponent },
  { path: ':page', component: PagesComponent },
  { path: '', component: PagesComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PagesComponent,
    RegisterComponent,
    SigninComponent,
    SignoutComponent,
    AdminPagesComponent,
    AdminNavbarComponent,
    AdminAddPageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    FlashMessagesModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    Title,
    PageService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
