import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FlashMessagesService } from 'angular2-flash-messages';

import { PageService } from '../../services/page.service';

declare var CKEDITOR: any;

@Component({
  selector: 'app-admin-add-page',
  templateUrl: './admin-add-page.component.html',
  styleUrls: ['./admin-add-page.component.scss']
})
export class AdminAddPageComponent implements OnInit {
  public title: string;
  public content: string;

  constructor(private _pageService: PageService,
              private _flashService: FlashMessagesService,
              private _router: Router) { }

  ngOnInit() {
    if (localStorage.getItem('user') !== 'admin') {
      this._router.navigateByUrl('');
    } else {
      CKEDITOR.replace('content');
    }
  }

  addPage({ form, value, valid }) {
    if (valid) {
      value.content = CKEDITOR.instances.content.getData();
      this._pageService.postAddPage(value)
        .subscribe(
          res => {
            this._flashService.show('Page added', {
              cssClass: 'alert alert-success',
              timeout: 2000
            });
            form.reset();
            CKEDITOR.instances.content.setData('');

            this._pageService.getPages()
              .subscribe((pages: any) => {
                this._pageService.pagesBS.next(pages);
              });
          },
          err => {
            this._flashService.show(err.error.message, {
              cssClass: 'alert alert-danger',
              timeout: 2000
            });
          }
        );
    }
  }
}
