import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Route} from '@angular/router';
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {selectIsRegistered} from "../admin/store/selectors/admin.selector";
import {AdminInitialStateType} from "../admin/models/store.model";
import {tap} from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private store: Store<AdminInitialStateType>
  ) {}

  private isRegistered(): Observable<boolean> {
    return this.store.select(selectIsRegistered).pipe(
      tap((isRegistered) => {
        console.log('isRegistered', isRegistered);
        if (!isRegistered) this.router.navigate(['admin/login']).then()
      })
    )
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.isRegistered();
  }

  canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
    return this.isRegistered();
  }
}
