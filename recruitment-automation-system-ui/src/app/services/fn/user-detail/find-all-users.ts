/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { UserDetailResponse } from '../../models/user-detail-response';

export interface FindAllUsers$Params {
}

export function findAllUsers(http: HttpClient, rootUrl: string, params?: FindAllUsers$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<UserDetailResponse>>> {
  const rb = new RequestBuilder(rootUrl, findAllUsers.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<UserDetailResponse>>;
    })
  );
}

findAllUsers.PATH = '/userDetail/findAll';
