import {createAction, props} from "@ngrx/store";
import {LoginRequestType} from "../../models/login.model";
import {UserCredential} from "@angular/fire/auth";

export const loginRequest = createAction(
  '[ADMIN] Login Request',
  props<LoginRequestType>()
);

export const loginRequestSuccess = createAction(
  '[ADMIN] Login Request Success',
);

export const loginRequestFailure = createAction(
  '[ADMIN] Login Request Failure'
)
