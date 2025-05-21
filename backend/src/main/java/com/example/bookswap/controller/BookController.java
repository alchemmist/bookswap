package com.example.bookswap.controller;

import com.example.bookswap.model.BookDto;
import com.example.bookswap.service.BookService;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.List;
import java.util.UUID;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/books")
@CrossOrigin(origins = "http://localhost:3000") // Добавьте эту аннотацию

@Tag(name = "Книги", description = "API для управления книгами")
public class BookController {
    private final BookService bookService;

    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    /**
     * GET /api/books - получить список всех книг
     */
    @GetMapping
    public ResponseEntity<List<BookDto>> getAllBooks() {
        List<BookDto> books = bookService.getAllBooks();
        return ResponseEntity.ok(books);
    }

    /**
     * GET /api/books/{id} - получить книгу по ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<BookDto> getBookById(@PathVariable UUID id) {
        BookDto book = bookService.getBookById(id);
        return ResponseEntity.ok(book);
    }

    /**
     * POST /api/books - создать новую книгу
     */
    @PostMapping
    public ResponseEntity<Void> createBook(@RequestBody BookDto bookDto) {
        bookService.createBook(bookDto);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    /**
     * PUT /api/books/{id} - обновить существующую книгу
     */
    @PutMapping("/{id}")
    public ResponseEntity<Void> updateBook(@PathVariable UUID id, @RequestBody BookDto bookDto) {
        bookDto.setId(id);
        int updated = bookService.updateBook(bookDto);
        if (updated > 0) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    /**
     * DELETE /api/books/{id} - удалить книгу по ID
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBook(@PathVariable UUID id) {
        int deleted = bookService.deleteBook(id);
        if (deleted > 0) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
