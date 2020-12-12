import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup = new FormGroup({
     photo: new FormControl(null, Validators.required),
     name: new FormControl(null, Validators.required),
     email: new FormControl(null, [Validators.email, Validators.required]),
     username: new FormControl(null, Validators.required),
     password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
     confirmPassword: new FormControl(null, [Validators.required, Validators.minLength(8)])
  });

  constructor(private _router: Router, private _userService: UserService) { }

  ngOnInit(): void {
  }
  
  selectedFile: File = null;
  onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0];
  }

  moveToLogin(){
    this._router.navigate(['/login']);
  }

  signup(){
    if(!this.signupForm.valid || (this.signupForm.controls.password.value != this.signupForm.controls.confirmPassword.value)) {
      console.log('Invalid Form!!!'); return;
    }
    this._userService.signup(JSON.stringify(this.signupForm.value))
    .subscribe(
      data => {console.log(data); this._router.navigate(['/login']);},
      error => console.error(error)
    )
    //console.log(JSON.stringify(this.signupForm.value));
  }

}
