package com.uceva.authors.infrastructure.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * Configuración de CORS para permitir el consumo desde los microfrontends.
 *
 * @remarks
 * Habilita las peticiones cruzadas hacia los endpoints de la API,
 * necesario para la comunicación entre microfrontends y microservicios.
 */
@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins("http://localhost:4200", "http://localhost:4201", "http://localhost:4202", "http://localhost:4203")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*");
    }
}
