import {createReducer, on} from "@ngrx/store";
import {loginRequest, loginRequestFailure, loginRequestSuccess} from "../actions/admin.action";
import { UserCredential } from "@angular/fire/auth";
import {AdminInitialStateType} from "../../models/store.model";

const initialState: AdminInitialStateType = {
  registered: false
}

export const ADMIN_KEY = 'admin';

export const userReducer = createReducer(
  initialState,
  on(
    loginRequestSuccess,
    (state) => ({...state, registered: true })
  ),
  on(
    loginRequestFailure,
    (state) => ({...state, registered: false})
  )

)
