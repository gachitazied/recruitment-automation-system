/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { createApplication } from '../fn/application/create-application';
import { CreateApplication$Params } from '../fn/application/create-application';
import { deleteApplicationById } from '../fn/application/delete-application-by-id';
import { DeleteApplicationById$Params } from '../fn/application/delete-application-by-id';
import { findAllApplication } from '../fn/application/find-all-application';
import { FindAllApplication$Params } from '../fn/application/find-all-application';
import { findApplicationById } from '../fn/application/find-application-by-id';
import { FindApplicationById$Params } from '../fn/application/find-application-by-id';
import { getStatusStats } from '../fn/application/get-status-stats';
import { GetStatusStats$Params } from '../fn/application/get-status-stats';
import { PageResponseApplicationResponse } from '../models/page-response-application-response';
import { updateApplicationById } from '../fn/application/update-application-by-id';
import { UpdateApplicationById$Params } from '../fn/application/update-application-by-id';
import { updateCandidateStatus } from '../fn/application/update-candidate-status';
import { UpdateCandidateStatus$Params } from '../fn/application/update-candidate-status';

@Injectable({ providedIn: 'root' })
export class ApplicationService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `createApplication()` */
  static readonly CreateApplicationPath = '/app/create/{jobId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createApplication()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createApplication$Response(params: CreateApplication$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return createApplication(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `createApplication$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createApplication(params: CreateApplication$Params, context?: HttpContext): Observable<number> {
    return this.createApplication$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `updateApplicationById()` */
  static readonly UpdateApplicationByIdPath = '/app/update/{appId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateApplicationById()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateApplicationById$Response(params: UpdateApplicationById$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return updateApplicationById(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateApplicationById$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateApplicationById(params: UpdateApplicationById$Params, context?: HttpContext): Observable<void> {
    return this.updateApplicationById$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `updateCandidateStatus()` */
  static readonly UpdateCandidateStatusPath = '/app/UpdateStatus/{appId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateCandidateStatus()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateCandidateStatus$Response(params: UpdateCandidateStatus$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return updateCandidateStatus(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateCandidateStatus$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateCandidateStatus(params: UpdateCandidateStatus$Params, context?: HttpContext): Observable<void> {
    return this.updateCandidateStatus$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `getStatusStats()` */
  static readonly GetStatusStatsPath = '/app/status-stats';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getStatusStats()` instead.
   *
   * This method doesn't expect any request body.
   */
  getStatusStats$Response(params?: GetStatusStats$Params, context?: HttpContext): Observable<StrictHttpResponse<{
[key: string]: number;
}>> {
    return getStatusStats(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getStatusStats$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getStatusStats(params?: GetStatusStats$Params, context?: HttpContext): Observable<{
[key: string]: number;
}> {
    return this.getStatusStats$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
[key: string]: number;
}>): {
[key: string]: number;
} => r.body)
    );
  }

  /** Path part for operation `findApplicationById()` */
  static readonly FindApplicationByIdPath = '/app/find/{appId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findApplicationById()` instead.
   *
   * This method doesn't expect any request body.
   */
  findApplicationById$Response(params: FindApplicationById$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseApplicationResponse>> {
    return findApplicationById(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findApplicationById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findApplicationById(params: FindApplicationById$Params, context?: HttpContext): Observable<PageResponseApplicationResponse> {
    return this.findApplicationById$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageResponseApplicationResponse>): PageResponseApplicationResponse => r.body)
    );
  }

  /** Path part for operation `findAllApplication()` */
  static readonly FindAllApplicationPath = '/app/find/all';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAllApplication()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllApplication$Response(params?: FindAllApplication$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseApplicationResponse>> {
    return findAllApplication(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findAllApplication$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllApplication(params?: FindAllApplication$Params, context?: HttpContext): Observable<PageResponseApplicationResponse> {
    return this.findAllApplication$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageResponseApplicationResponse>): PageResponseApplicationResponse => r.body)
    );
  }

  /** Path part for operation `deleteApplicationById()` */
  static readonly DeleteApplicationByIdPath = '/app/delete/{appId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteApplicationById()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteApplicationById$Response(params: DeleteApplicationById$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return deleteApplicationById(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteApplicationById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteApplicationById(params: DeleteApplicationById$Params, context?: HttpContext): Observable<void> {
    return this.deleteApplicationById$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

}
