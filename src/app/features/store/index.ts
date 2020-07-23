import { ActionReducerMap } from '@ngrx/store';

import { ColorState, colorReducer } from './color';

export interface AppState {
  color: ColorState;
}

export const reducers: ActionReducerMap<AppState> = {
  color: colorReducer,
};
