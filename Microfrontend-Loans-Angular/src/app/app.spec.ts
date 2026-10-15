import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { App } from './app';

/**
 * Pruebas del componente raíz del microfrontend.
 */
describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();
  });

  it('crea el componente raíz y renderiza la página de préstamos', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();

    const httpMock = TestBed.inject(HttpTestingController);
    httpMock.expectOne((req) => req.url.includes('/api/loans/')).flush([]);
    httpMock.verify();

    expect(fixture.componentInstance).toBeTruthy();
    expect(
      fixture.nativeElement.querySelector('app-loans-page')
    ).toBeTruthy();
  });
});
