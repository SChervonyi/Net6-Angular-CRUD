import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { catchError, switchMap, tap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { PolicyHolder } from "../models/policyHolder";
import { ErrorHandlerService } from "./error-hander.service";

@Injectable({
  providedIn: 'root',
})
export class PolicyHolderService {
  private values$: BehaviorSubject<PolicyHolder[]> = new BehaviorSubject<PolicyHolder[]>([]);
  private cached: boolean = false;
  private baseUrl: string = `${environment.BASE_URL}/api/policyHolder`;

  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService
    ) { }

  public get(): Observable<PolicyHolder[]> {
    if (this.cached) {
      return this.values$.asObservable();
    }

    return this.http.get<PolicyHolder[]>(`${this.baseUrl}`).pipe(
      tap(() => this.cached = true),
      switchMap((values: PolicyHolder[]) => {
        this.values$.next(values);
        return this.values$;
      }),
      catchError(this.errorHandlerService.handleError)
    );
  }
}
