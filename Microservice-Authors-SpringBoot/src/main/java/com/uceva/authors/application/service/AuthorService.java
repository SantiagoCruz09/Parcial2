package com.uceva.authors.application.service;

import com.uceva.authors.application.usecase.GetAllAuthorsUseCase;
import com.uceva.authors.domain.model.Author;
import com.uceva.authors.domain.repository.AuthorRepository;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Implementación del caso de uso para obtener autores.
 *
 * @remarks
 * Orquesta la lógica de la capa de aplicación delegando el acceso
 * a datos en el {@link AuthorRepository} del dominio.
 */
@Service
public class AuthorService implements GetAllAuthorsUseCase {

    private final AuthorRepository authorRepository;

    public AuthorService(AuthorRepository authorRepository) {
        this.authorRepository = authorRepository;
    }

    @Override
    public List<Author> execute(int count) {
        return authorRepository.findAll(count);
    }
}
