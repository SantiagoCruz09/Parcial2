package com.uceva.authors.presentation.controller;

import com.uceva.authors.application.usecase.GetAllAuthorsUseCase;
import com.uceva.authors.application.usecase.GetAuthorByIdUseCase;
import com.uceva.authors.application.usecase.GetAuthorsByNationalityUseCase;
import com.uceva.authors.domain.model.Author;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(AuthorController.class)
class AuthorControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private GetAllAuthorsUseCase getAllAuthorsUseCase;

    @MockitoBean
    private GetAuthorByIdUseCase getAuthorByIdUseCase;

    @MockitoBean
    private GetAuthorsByNationalityUseCase getAuthorsByNationalityUseCase;

    @Test
    void returnsAuthorsForValidListRequest() throws Exception {
        when(getAllAuthorsUseCase.execute(2)).thenReturn(List.of(author(1L), author(2L)));

        mockMvc.perform(get("/api/authors/2"))
                .andExpect(status().isOk());
    }

    @Test
    void rejectsInvalidListRequest() throws Exception {
        mockMvc.perform(get("/api/authors/0"))
                .andExpect(status().isBadRequest());
    }

    @Test
    void returnsAuthorForValidDetailRequest() throws Exception {
        when(getAuthorByIdUseCase.execute(4L)).thenReturn(author(4L));

        mockMvc.perform(get("/api/authors/detail/4"))
                .andExpect(status().isOk());
    }

    @Test
    void rejectsInvalidDetailRequest() throws Exception {
        mockMvc.perform(get("/api/authors/detail/0"))
                .andExpect(status().isBadRequest());
    }

    @Test
    void returnsAuthorsForValidNationalityRequest() throws Exception {
        when(getAuthorsByNationalityUseCase.execute("Colombiana", 2))
                .thenReturn(List.of(author(1L), author(2L)));

        mockMvc.perform(get("/api/authors/nationality/Colombiana/2"))
                .andExpect(status().isOk());
    }

    @Test
    void rejectsInvalidNationalityRequest() throws Exception {
        mockMvc.perform(get("/api/authors/nationality/Colombiana/0"))
                .andExpect(status().isBadRequest());
    }

    private Author author(Long id) {
        return new Author(id, "Autor " + id, "Colombiana", 1);
    }
}
