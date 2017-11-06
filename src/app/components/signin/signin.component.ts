import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FlashMessagesService } from 'angular2-flash-messages';

import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  public userRegistered = false;

  constructor(private _router: Router,
              private _userService: UserService,
              private _flashService: FlashMessagesService) { }

  ngOnInit() {
    if (localStorage.getItem('user')) {
      this._router.navigateByUrl('/');
    }

    if (localStorage.getItem('userRegistered')) {
      this.userRegistered = true;
      localStorage.removeItem('userRegistered');
    }
  }

  signin({ value, valid }) {
    if (valid) {
      this._userService.signin(value)
        .subscribe(
          res => {
            localStorage.setItem('user', res['user']['username']);
            if (localStorage.getItem('user') === 'admin') {
              this._router.navigateByUrl('admin/pages');
            } else {
              this._router.navigateByUrl('/');
            }
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
