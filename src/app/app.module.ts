import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PagesComponent } from './components/pages/pages.component';
import { RegisterComponent } from './components/register/register.component';

import { PageService } from './services/page.service';
import { UserService } from './services/user.service';

const appRoutes: Routes = [
  { path: 'signup', component: RegisterComponent },
  { path: ':page', component: PagesComponent },
  { path: '', component: PagesComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PagesComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
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
