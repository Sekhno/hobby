import {ADMIN_KEY} from "../reducers/admin.reducer";
import {createFeatureSelector, createSelector} from "@ngrx/store";
import {AdminInitialStateType} from "../../models/store.model";

const selectAdmin = createFeatureSelector<AdminInitialStateType>(ADMIN_KEY);

export const selectIsRegistered = createSelector(selectAdmin, (state) => state.registered)
