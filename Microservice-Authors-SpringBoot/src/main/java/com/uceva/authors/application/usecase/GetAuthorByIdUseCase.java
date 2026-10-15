package com.uceva.authors.application.usecase;

import com.uceva.authors.domain.model.Author;

/**
 * Caso de uso: obtener un autor por su identificador (capa de aplicación).
 */
public interface GetAuthorByIdUseCase {

    /**
     * Ejecuta el caso de uso.
     *
     * @param id identificador del autor
     * @return autor solicitado
     */
    Author execute(Long id);
}
