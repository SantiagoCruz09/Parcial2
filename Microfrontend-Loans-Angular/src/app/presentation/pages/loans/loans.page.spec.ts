import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Loan } from '../../../domain/models/loan.model';
import { LoansPage } from './loans.page';

/**
 * Pruebas de la página del microfrontend de Loans.
 */
describe('LoansPage', () => {
  let fixture: ComponentFixture<LoansPage>;
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
    {
      id: 2,
      bookTitle: 'La Odisea',
      userName: 'Luis Pérez',
      loanDate: '2024-03-01',
      returnDate: '2024-03-15',
      status: 'Devuelto',
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoansPage],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(LoansPage);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  /** Responde la petición HTTP de carga de préstamos. */
  function flushLoans(data: Loan[] = loans): void {
    httpMock.expectOne((req) => req.url.includes('/api/loans/')).flush(data);
  }

  it('crea la página', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('carga los préstamos al iniciar', () => {
    fixture.detectChanges();
    expect(fixture.componentInstance.loading()).toBe(true);

    flushLoans();

    expect(fixture.componentInstance.loans()).toEqual(loans);
    expect(fixture.componentInstance.loading()).toBe(false);
    expect(fixture.componentInstance.error()).toBeNull();
  });

  it('gestiona el error de carga del microservicio', () => {
    fixture.detectChanges();

    httpMock
      .expectOne((req) => req.url.includes('/api/loans/'))
      .flush('error', { status: 500, statusText: 'Server Error' });

    expect(fixture.componentInstance.error()).toBe(
      'No se pudieron cargar los préstamos.'
    );
    expect(fixture.componentInstance.loading()).toBe(false);
  });

  it('filtra los préstamos por estado', () => {
    fixture.detectChanges();
    flushLoans();

    fixture.componentInstance.onStatusChange('Devuelto');
    flushLoans();

    const visible = fixture.componentInstance.visibleLoans();
    expect(visible).toHaveLength(1);
    expect(visible[0].status).toBe('Devuelto');
  });

  it('consulta el detalle de un préstamo', () => {
    fixture.detectChanges();
    flushLoans();

    fixture.componentInstance.onDetail(1);
    httpMock.expectOne((req) => req.url.includes('/api/loans/detail/1')).flush(loans[0]);

    expect(fixture.componentInstance.selectedLoan()).toEqual(loans[0]);
    fixture.componentInstance.closeDetail();
    expect(fixture.componentInstance.selectedLoan()).toBeNull();
  });

  it('gestiona el error del detalle de un préstamo', () => {
    fixture.detectChanges();
    flushLoans();

    fixture.componentInstance.onDetail(99);
    httpMock.expectOne((req) => req.url.includes('/api/loans/detail/99'))
      .flush('error', { status: 404, statusText: 'Not Found' });

    expect(fixture.componentInstance.error()).toBe('No se pudo cargar el detalle del préstamo.');
    expect(fixture.componentInstance.loading()).toBe(false);
  });

  it('recarga los préstamos al cambiar la cantidad', () => {
    fixture.detectChanges();
    flushLoans();

    fixture.componentInstance.onCountChange(6);

    expect(fixture.componentInstance.count()).toBe(6);
    httpMock.expectOne((req) => req.url.includes('/api/loans/6')).flush(loans);
  });
});
