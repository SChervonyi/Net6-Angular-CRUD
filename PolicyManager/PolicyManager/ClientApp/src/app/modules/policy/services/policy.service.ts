import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Policy } from '../models/policy';
import { environment } from 'src/environments/environment';
import { ErrorHandlerService } from 'src/app/core/services/error-handler.service';

@Injectable()
export class PolicyService {
  private baseUrl: string = `${environment.BASE_URL}/api/policy`;

  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService
    ) { }

  public get(): Observable<Policy[]> {
    return this.http.get<Policy[]>(`${this.baseUrl}`).pipe(
      catchError(this.errorHandlerService.handleError)
    );
  }

  public update(policy: Policy): Observable<Policy> {
    const API_URL = `${this.baseUrl}/${policy.id}`;

    return this.http
    .put<Policy>(API_URL, policy)
    .pipe(
      catchError(this.errorHandlerService.handleError)
    );
  }

  public add(policy: Policy): Observable<Policy> {
    return this.http.post<Policy>(`${this.baseUrl}`, policy).pipe(
      catchError(this.errorHandlerService.handleError)
    );
  }

  public delete(policy: Policy) {
    const API_URL = `${this.baseUrl}/${policy.id}`;

    return this.http.delete(API_URL).pipe(
      catchError(this.errorHandlerService.handleError)
    );
  }
}
