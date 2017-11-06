import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { PageService } from '../../services/page.service';

@Component({
  selector: 'app-admin-pages',
  templateUrl: './admin-pages.component.html',
  styleUrls: ['./admin-pages.component.scss']
})
export class AdminPagesComponent implements OnInit {
  public pages: any;
  public successMessage = false;
  public errorMessage = false;

  constructor(private _pageService: PageService,
              private _router: Router) { }

  ngOnInit() {
    if (localStorage.getItem('user') !== 'admin') {
      this._router.navigateByUrl('');
    }

    this.pages = this._pageService.pagesBS;
  }
}
