import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {loginRequest, loginRequestFailure, loginRequestSuccess} from "../actions/admin.action";
import {switchMap, tap} from "rxjs/operators";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {SnackbarService} from "../../../_services/snackbar.service";
import {collectionImagesRequest} from "../actions/upload.action";
import {AngularFirestore} from "@angular/fire/compat/firestore";

@Injectable()
export class UploadEffect {
  readonly collectionRequest$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(collectionImagesRequest),
      switchMap(() => this.afs.collection('images').valueChanges()),
      tap(console.log)
    )
  })

  constructor(
    private actions$: Actions,
    private afs: AngularFirestore
  ) {
  }
}
