import {createAction, props} from "@ngrx/store";
import {FileDataType} from "../../models/upload.model";

export const collectionImagesRequest = createAction(
  '[UPLOAD] Collection Images Request'
);

export const collectionImagesRequestSuccess = createAction(
  '[UPLOAD] Collection Images Request Success',
  props<{data: FileDataType[]}>()
);

export const collectionImagesRequestFailure = createAction(
  '[UPLOAD] Collection Images Request Failure'
);
