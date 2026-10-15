/**
 * Error personalizado para la aplicación.
 *
 * @remarks
 * Esta clase extiende el objeto `Error` nativo y permite
 * asociar un código de estado HTTP a los errores lanzados
 * dentro de la aplicación.
 */
export class CustomError extends Error {

  /**
   * Crea una nueva instancia de `CustomError`.
   *
   * @param statusCode Código de estado HTTP asociado al error
   * @param message Mensaje descriptivo del error
   */
  constructor(
    public readonly statusCode: number,
    public readonly message: string
  ) {
    super(message);
  }

  /** Error HTTP 400 – Bad Request. */
  static badRequest(message: string): CustomError {
    return new CustomError(400, message);
  }

  /** Error HTTP 401 – Unauthorized. */
  static unAuthorized(message: string): CustomError {
    return new CustomError(401, message);
  }

  /** Error HTTP 403 – Forbidden. */
  static forbidden(message: string): CustomError {
    return new CustomError(403, message);
  }

  /** Error HTTP 404 – Not Found. */
  static notFound(message: string): CustomError {
    return new CustomError(404, message);
  }

  /** Error HTTP 409 – Conflict. */
  static conflict(message: string): CustomError {
    return new CustomError(409, message);
  }

  /** Error HTTP 500 – Internal Server Error. */
  static internalServer(message: string): CustomError {
    return new CustomError(500, message);
  }
}
