package com.uceva.authors.presentation.controller;

import com.uceva.authors.application.usecase.GetAllAuthorsUseCase;
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

    public AuthorController(GetAllAuthorsUseCase getAllAuthorsUseCase) {
        this.getAllAuthorsUseCase = getAllAuthorsUseCase;
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
}
