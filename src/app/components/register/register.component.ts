import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FlashMessagesService } from 'angular2-flash-messages';

import { UserService } from '../../services/user.service';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  constructor(private _userService: UserService,
              private _router: Router,
              private _flashService: FlashMessagesService) { }

  ngOnInit() {
  }

  signup({ value, valid }) {
    if (valid) {
      this._userService.signup(value)
        .subscribe(
          res => {
            localStorage.setItem('userRegistered', 'true');
            this._router.navigateByUrl('/signin');
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
