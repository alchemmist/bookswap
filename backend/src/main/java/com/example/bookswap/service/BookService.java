package com.example.bookswap.service;

import com.example.bookswap.model.BookDto;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.List;
import java.util.UUID;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Service;

@Service
public class BookService {
    private final JdbcTemplate jdbcTemplate;

    public BookService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private static class BookRowMapper implements RowMapper<BookDto> {
        @Override
        public BookDto mapRow(ResultSet rs, int rowNum) throws SQLException {
            BookDto dto = new BookDto();
            dto.setId((UUID) rs.getObject("id"));
            dto.setTitle(rs.getString("title"));
            dto.setAuthor(rs.getString("author"));
            dto.setCover(rs.getString("cover"));
            dto.setResponsabile((UUID) rs.getObject("responsabile"));
            dto.setCreatedAt(rs.getTimestamp("created_at"));
            return dto;
        }
    }

    /**
     * Create a new book record.
     */
    public void createBook(BookDto book) {
        String sql = "INSERT INTO books (title, author, cover, responsabile) VALUES "
            + "(?, ?, ?, ?)";
        jdbcTemplate.update(
            sql, book.getTitle(), book.getAuthor(), book.getCover(), book.getResponsabile());
    }

    /**
     * Retrieve a book by its ID.
     */
    public BookDto getBookById(UUID id) {
        String sql =
            "SELECT id, title, author, cover, responsabile, created_at FROM books WHERE id = ?";
        return jdbcTemplate.queryForObject(sql, new BookRowMapper(), id);
    }

    /**
     * Retrieve all books.
     */
    public List<BookDto> getAllBooks() {
        String sql = "SELECT id, title, author, cover, responsabile, created_at FROM books";
        return jdbcTemplate.query(sql, new BookRowMapper());
    }

    /**
     * Update an existing book record.
     */
    public int updateBook(BookDto book) {
        String sql =
            "UPDATE books SET title = ?, author = ?, cover = ?, responsabile = ? WHERE id = ?";
        return jdbcTemplate.update(sql, book.getTitle(), book.getAuthor(), book.getCover(),
            book.getResponsabile(), book.getId());
    }

    /**
     * Delete a book by its ID.
     */
    public int deleteBook(UUID id) {
        String sql = "DELETE FROM books WHERE id = ?";
        return jdbcTemplate.update(sql, id);
    }
}
