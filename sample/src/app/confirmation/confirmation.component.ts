import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {

  constructor(private _router: Router, private _formbuilder:FormBuilder, private route: ActivatedRoute, private _user: UserService) { }

  tkn: FormGroup = new FormGroup({
    token: new FormControl(null),
    email: new FormControl(null)
  });

  ngOnInit(): void {
  }

  ok() {
    this.route.params.subscribe(params => {
      this.tkn.controls.token.setValue(params['id']);
      //this.tkn = this._formbuilder.group({token: [params['id']]});
    });
    console.log(this.tkn.value) //log the value of id

    this._user.confirmation(JSON.stringify(this.tkn.value)).subscribe(
      data => {console.log(data); this._router.navigate(['/']);
    }

    );


  }

}
