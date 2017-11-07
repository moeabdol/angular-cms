import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class PageService {
  public pagesBS = new BehaviorSubject<string>(null);

  constructor(private _http: HttpClient) { }

  getPages() {
    return this._http.get('http://localhost:3000/pages');
  }

  getPage(slug) {
    return this._http.get(`http://localhost:3000/pages/${slug}`);
  }

  postAddPage(value) {
    return this._http.post(`http://localhost:3000/pages/add-page`, value);
  }

  getEditPage(id) {
    return this._http.get(`http://localhost:3000/pages/edit-page/${id}`);
  }

  postEditPage(value) {
    console.log(value);
    return this._http.post(`http://localhost:3000/pages/edit-page/${value.id}`,
      value);
  }

  getDeletePage(id) {
    return this._http.get(`http://localhost:3000/pages/delete-page/${id}`);
  }
}
