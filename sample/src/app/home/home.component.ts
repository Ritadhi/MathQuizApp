import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  name: String = '';
  email: String = '';
  photo: String = '';

  constructor(private _router: Router, private _user: UserService) {
    this._user.user()
    .subscribe(
      data => this.addName(data),
      error => this._router.navigate(['/login'])
    )
   }

   addName(data) {
    this.name = data.name;
    this.email = data.email;
    this.photo = data.photo;
   }

  ngOnInit(): void {
  }

  ask(){
    this._router.navigate(['/ask']);
  }

  logout(){
    this._user.logout()
    .subscribe(
      data => {console.log(data); this._router.navigate(['/login'])},
      error => console.error(error)
    )
  }

  number() {
    this._router.navigate(['/number']);
  }

}
