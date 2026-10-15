import { Request, Response } from "express";
import { HandleError } from "../../../domain/erros/handle.error";
import { BooksService } from "./books.service";

/**
 * Controlador de libros.
 *
 * @remarks
 * Esta clase maneja las peticiones HTTP relacionadas con libros,
 * delegando la lógica de negocio al `BooksService`.
 */
export class BooksController {

  /** Servicio de libros. */
  private readonly booksService = new BooksService();

  /**
   * Maneja la petición HTTP para obtener un listado de libros.
   *
   * @param req Objeto de petición de Express
   * @param res Objeto de respuesta de Express
   *
   * @example
   * ```http
   * GET /api/books/10
   * ```
   */
  getAllBooks = (req: Request, res: Response): void => {
    const { countBooks } = req.params;

    this.booksService
      .getAllBooks(Number(countBooks))
      .then((books) => res.status(200).json(books))
      .catch((error) => HandleError.error(error, res));
  };

  /**
   * Maneja la petición HTTP para obtener un libro por su id.
   *
   * @param req Objeto de petición de Express
   * @param res Objeto de respuesta de Express
   *
   * @example
   * ```http
   * GET /api/books/detail/5
   * ```
   */
  getBookById = (req: Request, res: Response): void => {
    const { id } = req.params;

    this.booksService
      .getBookById(Number(id))
      .then((book) => res.status(200).json(book))
      .catch((error) => HandleError.error(error, res));
  };

  /**
   * Maneja la petición HTTP para obtener libros de un género.
   *
   * @param req Objeto de petición de Express
   * @param res Objeto de respuesta de Express
   *
   * @example
   * ```http
   * GET /api/books/genre/Novela/10
   * ```
   */
  getBooksByGenre = (req: Request, res: Response): void => {
    const { genre, countBooks } = req.params;

    this.booksService
      .getBooksByGenre(genre as string, Number(countBooks))
      .then((books) => res.status(200).json(books))
      .catch((error) => HandleError.error(error, res));
  };
}
