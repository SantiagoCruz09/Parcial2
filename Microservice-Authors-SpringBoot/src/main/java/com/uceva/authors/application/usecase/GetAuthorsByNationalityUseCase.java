package com.uceva.authors.application.usecase;

import com.uceva.authors.domain.model.Author;

import java.util.List;

/**
 * Caso de uso: obtener autores por nacionalidad (capa de aplicación).
 */
public interface GetAuthorsByNationalityUseCase {

    /**
     * Ejecuta el caso de uso.
     *
     * @param nationality nacionalidad a filtrar
     * @param count       cantidad de autores a obtener
     * @return lista de autores de la nacionalidad indicada
     */
    List<Author> execute(String nationality, int count);
}
