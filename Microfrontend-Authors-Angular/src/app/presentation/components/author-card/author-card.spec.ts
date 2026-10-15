import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Author } from '../../../domain/models/author.model';
import { AuthorCard } from './author-card';

/**
 * Pruebas del componente presentacional de tarjeta de autor.
 */
describe('AuthorCard', () => {
  let fixture: ComponentFixture<AuthorCard>;

  const author: Author = {
    id: 9,
    name: 'Mario Vargas Llosa',
    nationality: 'Peruana',
    booksWritten: 32,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthorCard],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthorCard);
    fixture.componentRef.setInput('author', author);
    fixture.detectChanges();
  });

  it('crea el componente', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('renderiza el nombre, nacionalidad y libros escritos', () => {
    const content = fixture.nativeElement.textContent;
    expect(content).toContain(author.name);
    expect(content).toContain(author.nationality);
    expect(content).toContain(String(author.booksWritten));
  });
});
