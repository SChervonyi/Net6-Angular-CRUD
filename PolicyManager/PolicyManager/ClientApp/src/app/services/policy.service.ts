import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { Policy } from '../models/policy';
import { environment } from 'src/environments/environment';
import { ErrorHandlerService } from './error-hander.service';

@Injectable({
  providedIn: 'root',
})
export class PolicyService {
  private values$: BehaviorSubject<Policy[]> = new BehaviorSubject<Policy[]>([]);
  private cached: boolean = false;
  private baseUrl: string = `${environment.BASE_URL}/api/policy`;

  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService
    ) { }

  public get(): Observable<Policy[]> {
    if (this.cached) {
      return this.values$.asObservable();
    }

    return this.http.get<Policy[]>(`${this.baseUrl}`).pipe(
      tap(() => this.cached = true),
      switchMap((values: Policy[]) => {
        this.values$.next(values);
        return this.values$;
      }),
      catchError(this.errorHandlerService.handleError)
    );
  }

  public update(policy: Policy): Observable<Policy> {
    const API_URL = `${this.baseUrl}/${policy.id}`;

    return this.http
    .put<Policy>(API_URL, policy)
    .pipe(
      tap(value => this.updateValue(policy, value)),
      catchError(this.errorHandlerService.handleError)
    );
  }

  public add(policy: Policy): Observable<Policy> {
    return this.http.post<Policy>(`${this.baseUrl}`, policy).pipe(
      tap((value: Policy) => {
        const values: Policy[] = [...this.values$.value, value];
        this.values$.next(values);
        return value;
      }),
      catchError(this.errorHandlerService.handleError)
    );
  }

  public delete(policy: Policy) {
    const API_URL = `${this.baseUrl}/${policy.id}`;
    return this.http.delete(API_URL).pipe(
      tap(() => {
        const values: Policy[] = this.values$.value.filter(
          value => value.id !== policy.id
        );
        this.values$.next(values);
      }),
      catchError(this.errorHandlerService.handleError)
    );
  }

  private updateValue(target: Policy, _value: Policy): Policy {
    const values: Policy[] = [...this.values$.value];
    const valueIndex: number = values.findIndex(
      (item: Policy) => item.id === target.id
    );
    values[valueIndex] = _value;
    this.values$.next(values);
    return _value;
  }
}
