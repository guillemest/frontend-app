import { ColorModel } from '../../models/color.model';
import { createAction, props } from '@ngrx/store';

export const newColor = createAction('[Color] Nuevo color');

export const loadColorList = createAction('[Color] Cargar lista colores');

export const resetState = createAction('[Color] Reset state');

export const editColor = createAction(
  '[Color] Editar Color',
  props<{ color: ColorModel }>()
);

export const perfilConsulta = createAction(
  '[Color] Perfil consulta colores',
  (perfil = '') => ({ payload: { perfil } })
);
