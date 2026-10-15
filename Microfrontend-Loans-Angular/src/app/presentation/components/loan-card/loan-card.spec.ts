import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Loan } from '../../../domain/models/loan.model';
import { LoanCard } from './loan-card';

/**
 * Pruebas del componente presentacional de tarjeta de préstamo.
 */
describe('LoanCard', () => {
  let fixture: ComponentFixture<LoanCard>;

  const loan: Loan = {
    id: 4,
    bookTitle: 'La casa de los espíritus',
    userName: 'Carla Ríos',
    loanDate: '2024-04-01',
    returnDate: '2024-04-20',
    status: 'Devuelto',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoanCard],
    }).compileComponents();

    fixture = TestBed.createComponent(LoanCard);
    fixture.componentRef.setInput('loan', loan);
    fixture.detectChanges();
  });

  it('crea el componente', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('renderiza el libro, usuario y estado del préstamo', () => {
    const content = fixture.nativeElement.textContent;
    expect(content).toContain(loan.bookTitle);
    expect(content).toContain(loan.userName);
    expect(content).toContain(loan.status);
  });

  it('asigna la clase de color según el estado', () => {
    expect(fixture.componentInstance.statusBadgeClass['Activo']).toBe(
      'text-bg-primary'
    );
    expect(fixture.componentInstance.statusBadgeClass['Devuelto']).toBe(
      'text-bg-success'
    );
    expect(fixture.componentInstance.statusBadgeClass['Vencido']).toBe(
      'text-bg-danger'
    );
  });
});
