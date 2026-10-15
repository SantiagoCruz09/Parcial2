package com.uceva.authors.domain.repository;

import com.uceva.authors.domain.model.Author;

import java.util.List;

/**
 * Contrato de repositorio de autores (capa de dominio).
 *
 * @remarks
 * Define las operaciones de acceso a datos sin acoplarse a
 * una implementación concreta, respetando el principio de
 * inversión de dependencias de la Arquitectura Limpia.
 */
public interface AuthorRepository {

    /**
     * Obtiene un listado de autores.
     *
     * @param count cantidad de autores a obtener
     * @return lista de autores
     */
    List<Author> findAll(int count);

    /**
     * Obtiene un autor por su identificador.
     *
     * @param id identificador del autor
     * @return autor solicitado
     */
    Author findById(Long id);

    /**
     * Obtiene un listado de autores por nacionalidad.
     *
     * @param nationality nacionalidad a filtrar
     * @param count       cantidad de autores a obtener
     * @return lista de autores de la nacionalidad indicada
     */
    List<Author> findByNationality(String nationality, int count);
}
