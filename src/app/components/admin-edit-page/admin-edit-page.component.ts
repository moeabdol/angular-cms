import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { PageService } from '../../services/page.service';

@Component({
  selector: 'app-admin-edit-page',
  templateUrl: './admin-edit-page.component.html',
  styleUrls: ['./admin-edit-page.component.scss']
})
export class AdminEditPageComponent implements OnInit {
  public title: string;
  public content: string;
  public id: string;
  public params: any;

  constructor(private _route: ActivatedRoute,
              private _pageService: PageService) { }

  ngOnInit() {
    this._route.params.subscribe(params => {
      this.params = params['id'];
      this._pageService.getEditPage(this.params)
        .subscribe(
          page => {
            this.title = page['title'];
            this.content = page['content'];
            this.id = page['id'];
          },
          err => {
          }
        );
    });
  }
}
