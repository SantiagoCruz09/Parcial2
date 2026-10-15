package com.uceva.authors.application.service;

import com.uceva.authors.application.usecase.GetAllAuthorsUseCase;
import com.uceva.authors.application.usecase.GetAuthorByIdUseCase;
import com.uceva.authors.application.usecase.GetAuthorsByNationalityUseCase;
import com.uceva.authors.domain.model.Author;
import com.uceva.authors.domain.repository.AuthorRepository;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Implementación de los casos de uso de autores.
 *
 * @remarks
 * Orquesta la lógica de la capa de aplicación delegando el acceso
 * a datos en el {@link AuthorRepository} del dominio.
 */
@Service
public class AuthorService
        implements GetAllAuthorsUseCase, GetAuthorByIdUseCase, GetAuthorsByNationalityUseCase {

    private final AuthorRepository authorRepository;

    public AuthorService(AuthorRepository authorRepository) {
        this.authorRepository = authorRepository;
    }

    @Override
    public List<Author> execute(int count) {
        return authorRepository.findAll(count);
    }

    @Override
    public Author execute(Long id) {
        return authorRepository.findById(id);
    }

    @Override
    public List<Author> execute(String nationality, int count) {
        return authorRepository.findByNationality(nationality, count);
    }
}
