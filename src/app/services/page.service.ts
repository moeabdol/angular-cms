import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class PageService {
  public pagesBS = new BehaviorSubject<string>(null);

  constructor(private _http: Http) { }
}
