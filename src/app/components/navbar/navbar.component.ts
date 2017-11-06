import { Component, OnInit } from '@angular/core';

import { PageService } from '../../services/page.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public pages: any;
  public user: string;

  constructor(private _pageService: PageService) { }

  ngOnInit() {
    this._pageService.getPages()
      .subscribe((pages: any) => {
        this._pageService.pagesBS.next(pages);
        this.pages = this._pageService.pagesBS;
      });
  }

  get userSignedIn() {
    if (localStorage.getItem('user')) {
      this.user = localStorage.getItem('user');
      return true;
    }
    return false;
  }
}
