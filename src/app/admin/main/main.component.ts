import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {selectIsRegistered} from "../store/selectors/admin.selector";
import {Router} from "@angular/router";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainComponent implements OnInit {

  private _subscribeIsRegistered() {
    this.store.select(selectIsRegistered).subscribe((isRegistered) => {
      if (isRegistered) {
        this.router.navigate(['admin/upload']).then()
      }
    })
  }

  constructor(
    private store: Store,
    private router: Router
  ) { }

  ngOnInit(): void {
    this._subscribeIsRegistered();
  }

}
