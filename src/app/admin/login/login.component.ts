import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validator, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import {loginRequest} from "../store/actions/admin.action";
import {LoginRequestType} from "../models/login.model";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form = this.fb.group({
    email: this.fb.control('', [Validators.required, Validators.email]),
    password: this.fb.control('', Validators.required)
  })

  public login() {
    const request = this.form.value as LoginRequestType
    this.store.dispatch(loginRequest(request));
  }

  constructor(
    private fb: FormBuilder,
    private store: Store
  ) { }

  ngOnInit(): void {
  }

}
