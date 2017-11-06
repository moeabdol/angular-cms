import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UserService {
  constructor(private _http: HttpClient) { }

  signup(user) {
    return this._http.post('http://localhost:3000/users/signup', user);
  }

  signin(user) {
    return this._http.post('http://localhost:3000/users/signin', user);
  }
}
