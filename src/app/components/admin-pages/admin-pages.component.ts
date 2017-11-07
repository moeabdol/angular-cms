import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FlashMessagesService } from 'angular2-flash-messages';

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
              private _router: Router,
              private _flashService: FlashMessagesService) { }

  ngOnInit() {
    if (localStorage.getItem('user') !== 'admin') {
      this._router.navigateByUrl('');
    }

    this.pages = this._pageService.pagesBS;
  }

  deletePage(id) {
    if (confirm('Confirm deletion')) {
      this._pageService.getDeletePage(id)
        .subscribe(
          res => {
            this._flashService.show(res['message'], {
              cssClass: 'alert alert-success',
              timeout: 2000
            });

            this._pageService.getPages()
              .subscribe((pages: any) => this._pageService.pagesBS.next(pages));
          },
          err => {
            this._flashService.show(err['error']['message'], {
              cssClass: 'alert alert-danger',
              timeout: 2000
            });
          }
        );
    }
  }
}
