import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';



@Component({
  selector: 'app-number',
  templateUrl: './number.component.html',
  styleUrls: ['./number.component.css']
})
export class NumberComponent implements OnInit {

  public viewScore = false;
  public hintFirst = false;
  public hintSecond = false;
  public hintThird = false;
  public hintFourth = false;
  public hintFifth = false;


  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;
  fifthFormGroup: FormGroup;

  score: number = 0;

  prog: String = '';

  answer: number[] = [6, 5, 20, 6, 22];

  name: String = '';
  email: String = '';
  photo: String = '';

  constructor(private _formBuilder: FormBuilder, private _router: Router, private _user: UserService) {
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

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: [null]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: [null]
    });
    this.thirdFormGroup = this._formBuilder.group({
      thirdCtrl: [null]
    });
    this.fourthFormGroup = this._formBuilder.group({
      fourthCtrl: [null]
    });
    this.fifthFormGroup = this._formBuilder.group({
      fifthCtrl: [null]
    });
  }

  logout(){
    this._user.logout()
    .subscribe(
      data => {console.log(data); this._router.navigate(['/login'])},
      error => console.error(error)
    )
  }

  home() {
    this._router.navigate(['/home']);
  }

  hint001() {
    setTimeout(() => {
      this.hintFirst = !this.hintFirst;
    }) 
  }

  hint002() {
    setTimeout(() => {
      this.hintSecond = !this.hintSecond;
    }) 
  }  

  hint003() {
    setTimeout(() => {
      this.hintThird = !this.hintThird;
    }) 
  }  

  hint004() {
    setTimeout(() => {
      this.hintFourth = !this.hintFourth;
    }) 
  }  

  hint005() {
    setTimeout(() => {
      this.hintFifth = !this.hintFifth;
    }) 
  }  

  submit() {
    while(this.score == 0) {
      if(this.firstFormGroup.controls.firstCtrl.value == this.answer[0]) {
        this.score = this.score + 20;
        //console.log(this.firstFormGroup.value);
      }    
      if(this.secondFormGroup.controls.secondCtrl.value == this.answer[1]) {
        this.score = this.score + 20;
        //console.log(this.secondFormGroup.value);
      }
      if(this.thirdFormGroup.controls.thirdCtrl.value == this.answer[2]) {
        this.score = this.score + 20;
      }    
      if(this.fourthFormGroup.controls.fourthCtrl.value == this.answer[3]) {
        this.score = this.score + 20;
      }
      if(this.fifthFormGroup.controls.fifthCtrl.value == this.answer[4]) {
        this.score = this.score + 20;
      }    

      this.prog = this.score + '%';
      //console.log(this.prog)

      break;
    }
    setTimeout(() => {
      this.viewScore = true;
    })
    //console.log(this.score);
  }

  help() {
    this._router.navigate(['/ask']);
  }

}