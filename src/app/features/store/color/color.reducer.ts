import { Action, createReducer, on } from '@ngrx/store';

import { editColor, perfilConsulta } from './color.actions';
import { ColorModel } from '../../models/color.model';

export interface ColorState {
  color: ColorModel;
  perfil: string;
}

const initialColorState: ColorState = {
  color: null,
  perfil: ''
};

const reducer = createReducer(
  initialColorState,
  on(editColor, (state, { color }) => ({
    ...state,
    color,
  })),
  on(perfilConsulta, (state, { payload }) => ({
    ...state,
    perfil: payload.perfil
  }))
);

export function colorReducer(state: ColorState | undefined, action: Action) {
  return reducer(state, action);
}
