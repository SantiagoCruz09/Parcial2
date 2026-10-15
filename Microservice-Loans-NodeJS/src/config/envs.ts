import "dotenv/config";
import { get } from "env-var";

/**
 * Variables de entorno utilizadas por la aplicación.
 *
 * @remarks
 * Este objeto centraliza la lectura y validación de las variables
 * de entorno necesarias para el correcto funcionamiento del servidor.
 */
export const envs = {
  PORT: get("PORT").required().asPortNumber(),
  PUBLIC_PATH: get("PUBLIC_PATH").default("public").asString(),
};
