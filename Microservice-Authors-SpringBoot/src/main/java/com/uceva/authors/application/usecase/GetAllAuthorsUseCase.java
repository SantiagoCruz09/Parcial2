package com.uceva.authors.application.usecase;

import com.uceva.authors.domain.model.Author;

import java.util.List;

/**
 * Caso de uso: obtener un listado de autores (capa de aplicación).
 */
public interface GetAllAuthorsUseCase {

    /**
     * Ejecuta el caso de uso.
     *
     * @param count cantidad de autores a obtener
     * @return lista de autores
     */
    List<Author> execute(int count);
}
