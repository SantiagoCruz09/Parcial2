import request = require("supertest");
import { describe, expect, it } from "@jest/globals";
import { InMemoryBookRepository } from "./infrastructure/repositories/in-memory-book.repository";
import { GetAllBooksUseCase } from "./application/use-cases/get-all-books.use-case";
import { GetBookByIdUseCase } from "./application/use-cases/get-book-by-id.use-case";
import { GetBooksByGenreUseCase } from "./application/use-cases/get-books-by-genre.use-case";
import { AppRoutes } from "./presentation/routes";
import { Server } from "./presentation/server";

describe("Books use cases", () => {
  const repository = new InMemoryBookRepository();

  it("lists books", async () => {
    await expect(new GetAllBooksUseCase(repository).execute(3)).resolves.toHaveLength(3);
  });

  it("filters books by genre", async () => {
    const books = await new GetBooksByGenreUseCase(repository).execute("Novela", 2);
    expect(books).toHaveLength(2);
    expect(books.every((book) => book.genre === "Novela")).toBe(true);
  });

  it("gets a book by id", async () => {
    await expect(new GetBookByIdUseCase(repository).execute(7)).resolves.toMatchObject({ id: 7 });
  });
});

describe("Books endpoints", () => {
  const app = new Server({ port: 0, publicPath: "public", routes: AppRoutes.routes }).app;

  it.each([
    ["/api/books/3", 3],
    ["/api/books/genre/Novela/2", 2],
  ])("returns a list for %s", async (path, count) => {
    const response = await request(app).get(path);
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(count);
  });

  it("returns a book detail", async () => {
    const response = await request(app).get("/api/books/detail/4");
    expect(response.status).toBe(200);
    expect(response.body.id).toBe(4);
  });
});
