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

    const visible = fixture.componentInstance.visibleLoans();
    expect(visible).toHaveLength(1);
    expect(visible[0].status).toBe('Devuelto');
  });

  it('busca los préstamos por usuario', () => {
    fixture.detectChanges();
    flushLoans();

    fixture.componentInstance.onSearchChange('ana');

    const visible = fixture.componentInstance.visibleLoans();
    expect(visible).toHaveLength(1);
    expect(visible[0].id).toBe(1);
  });

  it('recarga los préstamos al cambiar la cantidad', () => {
    fixture.detectChanges();
    flushLoans();

    fixture.componentInstance.onCountChange(6);

    expect(fixture.componentInstance.count()).toBe(6);
    httpMock.expectOne((req) => req.url.includes('/api/loans/6')).flush(loans);
  });
});
