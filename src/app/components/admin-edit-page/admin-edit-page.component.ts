import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { FlashMessagesService } from 'angular2-flash-messages';

import { PageService } from '../../services/page.service';

declare var CKEDITOR: any;

@Component({
  selector: 'app-admin-edit-page',
  templateUrl: './admin-edit-page.component.html',
  styleUrls: ['./admin-edit-page.component.scss']
})
export class AdminEditPageComponent implements OnInit {
  public page: any;
  public title: string;
  public content: string;
  public id: string;
  public params: any;

  constructor(private _route: ActivatedRoute,
              private _pageService: PageService,
              private _router: Router,
              private _flashService: FlashMessagesService) { }

  ngOnInit() {
    if (localStorage.getItem('user') !== 'admin') {
      this._router.navigateByUrl('');
    } else {
      CKEDITOR.replace('content');
    }

    this._route.params.subscribe(params => {
      this.params = params['id'];
      this._pageService.getEditPage(this.params)
        .subscribe(
          page => {
            this.page = page;
            this.title = page['title'];
            this.content = page['content'];
            this.id = page['_id'];
          },
          err => {
          }
        );
    });
  }

  editPage({ value, valid }) {
    if (valid) {
      value.content = CKEDITOR.instances.content.getData();
      this._pageService.postEditPage(value)
        .subscribe(
          res => {
            this._flashService.show('Page edited', {
              cssClass: 'alert alert-success',
              timeout: 2000
            });

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
