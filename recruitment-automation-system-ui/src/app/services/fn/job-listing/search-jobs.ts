/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { PageResponseJobListingResponse } from '../../models/page-response-job-listing-response';

export interface SearchJobs$Params {
  title?: string;
  page?: number;
  size?: number;
  sort?: string;
}

export function searchJobs(http: HttpClient, rootUrl: string, params?: SearchJobs$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseJobListingResponse>> {
  const rb = new RequestBuilder(rootUrl, searchJobs.PATH, 'get');
  if (params) {
    rb.query('title', params.title, {});
    rb.query('page', params.page, {});
    rb.query('size', params.size, {});
    rb.query('sort', params.sort, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<PageResponseJobListingResponse>;
    })
  );
}

searchJobs.PATH = '/jobs/search';
