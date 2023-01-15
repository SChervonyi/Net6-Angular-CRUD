import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { catchError, shareReplay } from "rxjs/operators";
import { ErrorHandlerService } from "src/app/core/services/error-hander.service";
import { environment } from "src/environments/environment";
import { PolicyHolder } from "../models/policyHolder";

@Injectable()
export class PolicyHolderService {
  private cachedValues$: Observable<PolicyHolder[]> | null = null;
  private baseUrl: string = `${environment.BASE_URL}/api/policyHolder`;

  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService
    ) { }

  public get(): Observable<PolicyHolder[]> {
    if (this.cachedValues$) {
      return this.cachedValues$;
    }

    this.cachedValues$ = this.http.get<PolicyHolder[]>(`${this.baseUrl}`).pipe(
      shareReplay(1),
      catchError(this.errorHandlerService.handleError)
    );
    return this.cachedValues$;
  }
}
