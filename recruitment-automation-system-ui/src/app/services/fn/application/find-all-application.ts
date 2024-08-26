/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { PageResponseApplicationResponse } from '../../models/page-response-application-response';

export interface FindAllApplication$Params {
  page?: number;
  size?: number;
}

export function findAllApplication(http: HttpClient, rootUrl: string, params?: FindAllApplication$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseApplicationResponse>> {
  const rb = new RequestBuilder(rootUrl, findAllApplication.PATH, 'get');
  if (params) {
    rb.query('page', params.page, {});
    rb.query('size', params.size, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<PageResponseApplicationResponse>;
    })
  );
}

findAllApplication.PATH = '/app/find/all';
