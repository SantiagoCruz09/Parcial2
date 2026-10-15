package com.uceva.authors.presentation.controller;

import com.uceva.authors.application.usecase.GetAllAuthorsUseCase;
import com.uceva.authors.application.usecase.GetAuthorByIdUseCase;
import com.uceva.authors.application.usecase.GetAuthorsByNationalityUseCase;
import com.uceva.authors.domain.model.Author;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * Controlador REST de autores (capa de presentación).
 */
@RestController
@RequestMapping("/api/authors")
@Tag(name = "Authors", description = "Operaciones relacionadas con autores")
public class AuthorController {

    private final GetAllAuthorsUseCase getAllAuthorsUseCase;
    private final GetAuthorByIdUseCase getAuthorByIdUseCase;
    private final GetAuthorsByNationalityUseCase getAuthorsByNationalityUseCase;

    public AuthorController(
            GetAllAuthorsUseCase getAllAuthorsUseCase,
            GetAuthorByIdUseCase getAuthorByIdUseCase,
            GetAuthorsByNationalityUseCase getAuthorsByNationalityUseCase) {
        this.getAllAuthorsUseCase = getAllAuthorsUseCase;
        this.getAuthorByIdUseCase = getAuthorByIdUseCase;
        this.getAuthorsByNationalityUseCase = getAuthorsByNationalityUseCase;
    }

    /**
     * Obtiene un listado de autores generados dinámicamente.
     *
     * @param countAuthors cantidad de autores a obtener
     * @return lista de autores
     */
    @GetMapping("/{countAuthors}")
    @Operation(summary = "Obtener listado de autores")
    public ResponseEntity<List<Author>> getAllAuthors(@PathVariable int countAuthors) {
        return ResponseEntity.ok(getAllAuthorsUseCase.execute(countAuthors));
    }

    /**
     * Obtiene un autor por su identificador.
     *
     * @param authorId identificador del autor
     * @return autor solicitado
     */
    @GetMapping("/detail/{authorId}")
    @Operation(summary = "Obtener un autor por id")
    public ResponseEntity<Author> getAuthorById(@PathVariable Long authorId) {
        return ResponseEntity.ok(getAuthorByIdUseCase.execute(authorId));
    }

    /**
     * Obtiene un listado de autores por nacionalidad.
     *
     * @param nationality  nacionalidad a filtrar
     * @param countAuthors cantidad de autores a obtener
     * @return lista de autores de la nacionalidad indicada
     */
    @GetMapping("/nationality/{nationality}/{countAuthors}")
    @Operation(summary = "Obtener autores por nacionalidad")
    public ResponseEntity<List<Author>> getAuthorsByNationality(
            @PathVariable String nationality,
            @PathVariable int countAuthors) {
        return ResponseEntity.ok(
                getAuthorsByNationalityUseCase.execute(nationality, countAuthors));
    }
}
