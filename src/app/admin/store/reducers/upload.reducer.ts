import {createReducer, on} from "@ngrx/store";
import {collectionImagesRequest, collectionImagesRequestSuccess} from "../actions/upload.action";
import {UploadInitialState} from "../../models/upload.model";

const initialState: UploadInitialState = {
  data: []
}

export const UPLOAD_KEY = 'upload';

export const uploadReducer = createReducer(
  initialState,
  on(
    collectionImagesRequestSuccess,
    (state) => ({...state})
  )
)
