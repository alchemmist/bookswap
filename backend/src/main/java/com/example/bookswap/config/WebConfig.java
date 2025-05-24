package com.example.bookswap.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry
            .addMapping("/**") // Применяем ко всем эндпоинтам
            .allowedOrigins("http://localhost:3000") // Разрешенный origin фронтенда
            .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH") // Разрешенные HTTP-методы
            .allowedHeaders("*") // Разрешенные заголовки
            .allowCredentials(true) // Разрешаем куки и авторизацию
            .maxAge(3600); // Время кэширования предварительных запросов
    }
}
