import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signout',
  templateUrl: './signout.component.html',
  styleUrls: ['./signout.component.scss']
})
export class SignoutComponent implements OnInit {
  constructor(private _router: Router) { }

  ngOnInit() {
    if (localStorage.getItem('user')) {
      localStorage.removeItem('user');
      this._router.navigateByUrl('/');
    } else {
      this._router.navigateByUrl('signin');
    }
  }
}
