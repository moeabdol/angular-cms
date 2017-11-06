import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { PageService } from '../../services/page.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {
  private _params: any;
  public pageBody: any;
  public pages: any;

  constructor(private _route: ActivatedRoute,
              private _router: Router,
              private _pageService: PageService,
              private _title: Title) { }

  ngOnInit() {
    this._pageService.getPages().subscribe(pages => this.pages = pages);
    this._route.params.subscribe(params => {
      this._params = params['page'];
      if (this._params === undefined) {
        this._params = 'home';
        this._title.setTitle('CMS');
      } else {
        this._title.setTitle(this._params
          .replace(/-/g, ' ')
          .replace(/\b\w/g, l => l.toUpperCase()));
      }

      this._pageService.getPage(this._params)
        .subscribe(pageBody => {
          if (pageBody === null) {
            this._router.navigateByUrl('');
          }
          this.pageBody = pageBody;
        });
    });
  }
}
