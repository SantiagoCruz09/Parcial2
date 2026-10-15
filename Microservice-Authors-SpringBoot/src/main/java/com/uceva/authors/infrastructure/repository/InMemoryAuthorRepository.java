package com.uceva.authors.infrastructure.repository;

import com.uceva.authors.domain.model.Author;
import com.uceva.authors.domain.repository.AuthorRepository;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
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

    @Override
    public List<Author> findAll(int count) {
        List<Author> authors = new ArrayList<>();

        for (int i = 1; i <= count; i++) {
            authors.add(new Author(
                    (long) i,
                    NAMES[random.nextInt(NAMES.length)],
                    NATIONALITIES[random.nextInt(NATIONALITIES.length)],
                    random.nextInt(1, 40)
            ));
        }

        return authors;
    }
}
