import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Loan } from '../../../domain/models/loan.model';
import { API_CONFIG } from '../config/api.config';
import { HttpLoanRepository } from './http-loan.repository';

/**
 * Pruebas del repositorio HTTP de préstamos.
 */
describe('HttpLoanRepository', () => {
  let repository: HttpLoanRepository;
  let httpMock: HttpTestingController;

  const loans: Loan[] = [
    {
      id: 1,
      bookTitle: 'El Quijote',
      userName: 'Ana Torres',
      loanDate: '2024-05-01',
      returnDate: '2024-05-15',
      status: 'Activo',
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HttpLoanRepository,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });

    repository = TestBed.inject(HttpLoanRepository);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('crea el repositorio', () => {
    expect(repository).toBeTruthy();
  });

  it('consulta la URL del microservicio Loans con la cantidad indicada', () => {
    repository.getLoans(5).subscribe((result) => {
      expect(result).toEqual(loans);
    });

    const req = httpMock.expectOne(
      `${API_CONFIG.loansApiUrl}/api/loans/5`
    );
    expect(req.request.method).toBe('GET');
    req.flush(loans);
  });

  it('consulta préstamos por estado', () => {
    repository.getLoansByStatus('Activo', 4).subscribe((result) => {
      expect(result).toEqual(loans);
    });
    const req = httpMock.expectOne(
      `${API_CONFIG.loansApiUrl}/api/loans/status/Activo/4`
    );
    expect(req.request.method).toBe('GET');
    req.flush(loans);
  });

  it('consulta el detalle de un préstamo', () => {
    repository.getLoanById(1).subscribe((result) => {
      expect(result).toEqual(loans[0]);
    });
    const req = httpMock.expectOne(
      `${API_CONFIG.loansApiUrl}/api/loans/detail/1`
    );
    expect(req.request.method).toBe('GET');
    req.flush(loans[0]);
  });

  it('consulta préstamos por usuario', () => {
    repository.searchLoans('Ana', 4).subscribe((result) => {
      expect(result).toEqual(loans);
    });
    const req = httpMock.expectOne(`${API_CONFIG.loansApiUrl}/api/loans/4`);
    expect(req.request.method).toBe('GET');
    req.flush(loans);
  });
});
