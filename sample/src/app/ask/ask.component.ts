import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-ask',
  templateUrl: './ask.component.html',
  styleUrls: ['./ask.component.css']
})
export class AskComponent implements OnInit {

  public showThanks = false;

  askForm: FormGroup = new FormGroup({
    ask: new FormControl(null, Validators.required)
  });

  
  name: String = '';
  email: String = '';
  photo: String = '';

  constructor(private _router: Router, private _user: UserService) {
    this._user.user()
    .subscribe(
      data => this.addName(data),
      error => this._router.navigate(['/home'])
    )
   }

   addName(data) {
    this.name = data.name;
    this.email = data.email;
    this.photo = data.photo;
   }

  ngOnInit(): void {
  }


  logout(){
    this._user.logout()
    .subscribe(
      data => {console.log(data); this._router.navigate(['/login'])},
      error => console.error(error)
    )
  }

  ask(){
    this._router.navigate(['/home']);
    setTimeout(() => {
      this.showThanks = false;
    })
  }

  upload() {
    
  }

  askTutor(){
    if(!this.askForm.valid) {
      console.log('Ask Valid Question!!!'); return;
    }
    setTimeout(() => {
      this.showThanks = true;
    })
    console.log(JSON.stringify(this.askForm.value));
    //alert("Thanks for asking");
    //this._router.navigate(['/home']);
  }

}
