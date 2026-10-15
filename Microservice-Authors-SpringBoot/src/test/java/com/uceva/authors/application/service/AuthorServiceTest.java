package com.uceva.authors.application.service;

import com.uceva.authors.domain.model.Author;
import com.uceva.authors.domain.repository.AuthorRepository;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

/**
 * Pruebas unitarias de los casos de uso del servicio de autores.
 */
class AuthorServiceTest {

    private final AuthorService authorService = new AuthorService(new FakeAuthorRepository());

    @Test
    void getAllAuthorsReturnsRequestedCount() {
        List<Author> authors = authorService.execute(3);

        assertEquals(3, authors.size());
        assertEquals(1L, authors.get(0).id());
    }

    @Test
    void getAuthorByIdReturnsAuthorWithRequestedId() {
        Author author = authorService.execute(7L);

        assertEquals(7L, author.id());
    }

    @Test
    void getAuthorsByNationalityReturnsAuthorsOfThatNationality() {
        List<Author> authors = authorService.execute("Colombiana", 2);

        assertEquals(2, authors.size());
        authors.forEach(author -> assertEquals("Colombiana", author.nationality()));
    }

    /**
     * Repositorio falso en memoria utilizado para las pruebas.
     */
    private static class FakeAuthorRepository implements AuthorRepository {

        @Override
        public List<Author> findAll(int count) {
            List<Author> authors = new ArrayList<>();

            for (int i = 1; i <= count; i++) {
                authors.add(new Author((long) i, "Autor " + i, "Colombiana", i));
            }

            return authors;
        }

        @Override
        public Author findById(Long id) {
            return new Author(id, "Autor " + id, "Colombiana", 1);
        }

        @Override
        public List<Author> findByNationality(String nationality, int count) {
            List<Author> authors = new ArrayList<>();

            for (int i = 1; i <= count; i++) {
                authors.add(new Author((long) i, "Autor " + i, nationality, i));
            }

            return authors;
        }
    }
}
