import { Component, OnInit } from '@angular/core';

import { FlashMessagesService } from 'angular2-flash-messages';

import { PageService } from '../../services/page.service';

@Component({
  selector: 'app-admin-add-page',
  templateUrl: './admin-add-page.component.html',
  styleUrls: ['./admin-add-page.component.scss']
})
export class AdminAddPageComponent implements OnInit {
  public title: string;
  public content: string;

  constructor(private _pageService: PageService,
              private _flashService: FlashMessagesService) { }

  ngOnInit() {
  }

  addPage({ form, value, valid }) {
    if (valid) {
      this._pageService.postAddPage(value)
        .subscribe(
          res => {
            this._flashService.show('Page added', {
              cssClass: 'alert alert-success',
              timeout: 2000
            });
            form.reset();

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
