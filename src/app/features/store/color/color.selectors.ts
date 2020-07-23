import { createFeatureSelector, createSelector } from '@ngrx/store';

import { ColorState } from './color.reducer';

const colorSelector = createFeatureSelector<ColorState>('color');

export const selColor = createSelector(colorSelector, (s) => s.color);

export const selPerfil = createSelector(colorSelector, (s) => s.perfil);
