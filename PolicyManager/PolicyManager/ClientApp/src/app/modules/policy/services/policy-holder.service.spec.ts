import { inject, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { PolicyHolderService } from './policy-holder.service';
import { ErrorHandlerService } from '../../../core/services/error-handler.service';
import { PolicyHolder } from '../models/policyHolder';
import { environment } from 'src/environments/environment';

const policyHoldersMock: PolicyHolder[] = []

describe('PolicyHolderService', () => {

  let service: PolicyHolderService;
  let httpMock: HttpTestingController;
  let errorHandlerServiceMock: ErrorHandlerService

  beforeEach(() => {
    errorHandlerServiceMock = <ErrorHandlerService>{};
    errorHandlerServiceMock.handleError = jest.fn();

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        PolicyHolderService,
        { provide: ErrorHandlerService, useValue: errorHandlerServiceMock }
      ],
    });

    service = TestBed.inject(PolicyHolderService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('get', () => {
    test('http get called', () => {
      service.get().subscribe((res) => {
        expect(res).toEqual(policyHoldersMock);
      });

      const req = httpMock.expectOne({
        method: 'GET',
        url: `${environment.BASE_URL}/api/policyHolder`,
      });

      req.flush([]);
    });

    test('result cached', () => {
      service.get().subscribe((res) => {
        expect(res).toEqual(policyHoldersMock);
      });

      service.get().subscribe((res) => {
        expect(res).toEqual(policyHoldersMock);
      });

      const req = httpMock.expectOne({
        method: 'GET',
        url: `${environment.BASE_URL}/api/policyHolder`,
      });

      req.flush([]);
    });

    test('error handled', () => {
      service.get().subscribe(() => {
        expect(errorHandlerServiceMock.handleError).toBeCalled();
      });

      const req = httpMock.expectOne({
        method: 'GET',
        url: `${environment.BASE_URL}/api/policyHolder`,
      });

      req.flush(null, { status: 400, statusText: "Bad Request" });
    });
  });
});
