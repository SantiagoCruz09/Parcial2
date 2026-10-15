package com.uceva.authors.domain.model;

/**
 * Modelo de dominio que representa un autor.
 *
 * @param id            Identificador único del autor
 * @param name          Nombre completo del autor
 * @param nationality   Nacionalidad del autor
 * @param booksWritten  Cantidad de libros escritos
 */
public record Author(
        Long id,
        String name,
        String nationality,
        int booksWritten
) {
}
