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
}
