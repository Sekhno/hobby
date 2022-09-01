import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import {COLLECTION_CATEGORIES, COLLECTION_IMAGES, FileDataType} from "../admin/models/upload.model";

@Injectable({ providedIn: 'root' })
export class CategoryResolver implements Resolve<any> {
  constructor(
    private afs: AngularFirestore,
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    const id = route.paramMap.get('id') as string;
    return this.afs
      .collection(COLLECTION_IMAGES)
      .doc(COLLECTION_CATEGORIES)
      .collection<FileDataType>(id)
    // this.service.getHero(route.paramMap.get('id'));
  }
}
