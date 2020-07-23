import { ColorModel } from './color.model';

export interface PaginatorRequestModel {
  limit?: number;
  page?: number;
}

export interface PaginatorResponseModel {
  result: ColorModel[];
  total: number;
  currentPage: number;
  pages: number;
}
