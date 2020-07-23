import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpErrorResponse,
} from '@angular/common/http';
import { timeout, catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class RequestHandlerService {
  private timeOut = 60000;
  baseUrl =  environment.baseUrl;
  constructor(private http: HttpClient) {}

  doGet(url, params?: HttpParams): Promise<any> {
    const httpHeaders = new HttpHeaders().set('Accept', 'application/json');
    const bodyRequest = { headers: httpHeaders, params: {} };

    if (params) {
      bodyRequest.params = params;
    }

    return new Promise((resolve, reject) => {
      this.http
        .get(this.baseUrl + url, bodyRequest)
        .pipe(
          timeout(this.timeOut),
          catchError((e) => {
            return throwError(this.handleError(e));
          })
        )
        .toPromise()
        .then((res) => {
          resolve(res);
        })
        .catch((err) => reject(err));
    });
  }

  doPut(url, body) {
    const httpHeaders = new HttpHeaders().set(
      'content-type',
      'application/json'
    );

    return new Promise((resolve, reject) => {
      this.http
        .put(this.baseUrl + url, body, {
          headers: httpHeaders,
        })
        .pipe(
          timeout(this.timeOut),
          catchError((e) => {
            return throwError(this.handleError(e));
          })
        )
        .toPromise()
        .then((res) => {
          resolve(res);
        })
        .catch((err) => reject(err));
    });
  }

  doPost(url, body) {
    const httpHeaders = new HttpHeaders().set(
      'content-type',
      'application/json'
    );

    return new Promise((resolve, reject) => {
      this.http
        .post(this.baseUrl + url, body, {
          headers: httpHeaders,
        })
        .pipe(
          timeout(this.timeOut),
          catchError((e) => {
            return throwError(this.handleError(e));
          })
        )
        .toPromise()
        .then((res) => {
          resolve(res);
        })
        .catch((err) => reject(err));
    });
  }

  doDelete(url) {
    const httpHeaders = new HttpHeaders().set(
      'content-type',
      'application/json'
    );

    return this.http.delete(this.baseUrl + url, {
      headers: httpHeaders,
      responseType: 'json',
    });
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (!(error.error instanceof ErrorEvent)) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Message: ${error.message}`;
    }
    return errorMessage;
  }
}
