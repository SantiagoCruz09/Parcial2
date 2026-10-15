import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Book } from '../../../domain/models/book.model';
import { BookCard } from './book-card';

/**
 * Pruebas del componente presentacional de tarjeta de libro.
 */
describe('BookCard', () => {
  let fixture: ComponentFixture<BookCard>;

  const book: Book = {
    id: 7,
    title: 'La casa de los espíritus',
    author: 'Isabel Allende',
    genre: 'Novela',
    year: 1982,
    price: 52000,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookCard],
    }).compileComponents();

    fixture = TestBed.createComponent(BookCard);
    fixture.componentRef.setInput('book', book);
    fixture.detectChanges();
  });

  it('crea el componente', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('renderiza el título, autor y género del libro', () => {
    const content = fixture.nativeElement.textContent;
    expect(content).toContain(book.title);
    expect(content).toContain(book.author);
    expect(content).toContain(book.genre);
  });
});
