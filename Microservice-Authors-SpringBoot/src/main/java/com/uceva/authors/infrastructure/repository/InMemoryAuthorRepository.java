package com.uceva.authors.infrastructure.repository;

import com.uceva.authors.domain.model.Author;
import com.uceva.authors.domain.repository.AuthorRepository;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

/**
 * Implementación en memoria del repositorio de autores.
 *
 * @remarks
 * Genera datos simulados para fines de demostración, sin depender
 * de una base de datos. Pertenece a la capa de infraestructura.
 */
@Repository
public class InMemoryAuthorRepository implements AuthorRepository {

    private static final String[] NAMES = {
            "Gabriel García Márquez",
            "Jorge Luis Borges",
            "Isabel Allende",
            "Julio Cortázar",
            "Mario Vargas Llosa",
    };

    private static final String[] NATIONALITIES = {
            "Colombiana",
            "Argentina",
            "Chilena",
            "Peruana",
            "Mexicana",
    };

    private final Random random = new Random();
    private final Map<Long, Author> authors = new HashMap<>();

    @Override
    public List<Author> findAll(int count) {
        List<Author> authors = new ArrayList<>();

        for (int i = 1; i <= count; i++) {
            authors.add(getOrCreate((long) i, null));
        }

        return authors;
    }

    @Override
    public Author findById(Long id) {
        return getOrCreate(id, null);
    }

    @Override
    public List<Author> findByNationality(String nationality, int count) {
        List<Author> authors = new ArrayList<>();

        for (int i = 1; i <= count; i++) {
            authors.add(getOrCreate((long) i, nationality));
        }

        return authors;
    }

    private Author getOrCreate(Long id, String nationality) {
        Author existingAuthor = authors.get(id);
        if (existingAuthor != null) {
            if (nationality != null) {
                existingAuthor = new Author(
                        existingAuthor.id(),
                        existingAuthor.name(),
                        nationality,
                        existingAuthor.booksWritten()
                );
                authors.put(id, existingAuthor);
            }
            return existingAuthor;
        }

        Author author = new Author(
                id,
                NAMES[random.nextInt(NAMES.length)],
                nationality != null ? nationality : randomNationality(),
                random.nextInt(1, 40)
        );
        authors.put(id, author);
        return author;
    }

    private String randomNationality() {
        return NATIONALITIES[random.nextInt(NATIONALITIES.length)];
    }
}
