import cors = require("cors");
import express = require("express");
import { Router } from "express";
import path from "path";
import swaggerUi = require('swagger-ui-express');
import { swaggerSpec } from '../config/swagger';
import { Options } from "../domain/interfaces/server.interface";

/**
 * Clase que representa el servidor Express de la aplicación.
 *
 * @remarks
 * Esta clase centraliza la configuración del servidor HTTP,
 * incluyendo middlewares, rutas, documentación Swagger y SPA.
 */
export class Server {
  /** Instancia de Express */
  public readonly app = express();

  private readonly port: number;
  private readonly publicPath: string;
  private readonly routes: Router;

  /**
   * Crea una nueva instancia del servidor.
   *
   * @param options Configuración del servidor
   */
  constructor(options: Options) {
    const { port, publicPath, routes } = options;
    this.port = port;
    this.publicPath = publicPath;
    this.routes = routes;
    this.app.use(cors({
      origin: ["http://localhost:4200", "http://localhost:4201", "http://localhost:4202", "http://localhost:4203"],
    }));
    this.app.use(express.json());
    this.app.use(express.static(this.publicPath));
    this.app.use(this.routes);
    this.app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    this.app.use((req, res) => {
      res.sendFile(path.join(__dirname, `../../${this.publicPath}/index.html`));
    });
  }

  /**
   * Inicializa y arranca el servidor.
   */
  async start(): Promise<void> {
    this.app.listen(this.port, () => {
      console.log(`Server Loans Running on Port ${this.port}`);
    });
  }
}
