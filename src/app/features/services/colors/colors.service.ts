import { ColorModel } from './../../models/color.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestHandlerService } from '../request-handler/request-handler.service';
import { PaginatorRequestModel, PaginatorResponseModel } from '../../models/paginator.model';

@Injectable()
export class ColorsService {
  constructor(private requestHandlerService: RequestHandlerService) {}

  nuevoColor(request: ColorModel) {
    const url = '/colores';
    return this.requestHandlerService.doPost(url, request);
  }

  actualizarColores(request: ColorModel) {
    const url = `/colores/${request._id}`;
    return this.requestHandlerService.doPut(url, request);
  }

  obtenerColores(
    options?: PaginatorRequestModel
  ): Promise<PaginatorResponseModel> {
    let url = '/colores/';
    if (options && options.limit) {
      url = `${url}?limit=${options.limit}`;
    }
    if (options && options.page) {
      if (url.includes('limit')) {
        url = `${url}&page=${options.page}`;
      } else {
        url = `${url}?page=${options.page}`;
      }
    }
    return this.requestHandlerService.doGet(url);
  }

  eliminarColor(colorId): Observable<any> {
    const url = `/colores/${colorId}`;
    return this.requestHandlerService.doDelete(url);
  }
}
