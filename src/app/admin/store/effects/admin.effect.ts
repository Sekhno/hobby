import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {loginRequest, loginRequestFailure, loginRequestSuccess} from "../actions/admin.action";
import {catchError, map, switchMap, tap} from "rxjs/operators";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {from} from "rxjs";
import {userReducer} from "../reducers/admin.reducer";
import {UserCredential} from "@angular/fire/auth";
import {SnackbarService} from "../../../_services/snackbar.service";

@Injectable()
export class AdminEffect {
  readonly loginRequest$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginRequest),
      switchMap(({email, password}) => this.auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => loginRequestSuccess())
        .catch((error) => this.handlerLoginError(error))
      ),
      tap(console.log)
    )
  })

  private handlerLoginError(error: any) {
    this.snackbar.openSnackBar(error.code, 'Close')
    return loginRequestFailure()
  }

  constructor(
    private actions$: Actions,
    private auth: AngularFireAuth,
    private snackbar: SnackbarService
  ) {
  }
}
