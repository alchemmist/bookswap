package com.example.bookswap.service;

import com.example.bookswap.model.ReviewDto;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.List;
import java.util.UUID;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Service;

@Service
public class ReviewService {
    private final JdbcTemplate jdbcTemplate;

    public ReviewService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private static class ReviewRowMapper implements RowMapper<ReviewDto> {
        @Override
        public ReviewDto mapRow(ResultSet rs, int rowNum) throws SQLException {
            ReviewDto dto = new ReviewDto();
            dto.setId(rs.getInt("id"));
            dto.setContent(rs.getString("content"));
            dto.setStars(rs.getInt("stars"));
            dto.setReviewer((UUID) rs.getObject("reviewer"));
            dto.setBook((UUID) rs.getObject("book"));
            dto.setCreatedAt(rs.getTimestamp("created_at"));
            return dto;
        }
    }

    /**
     * Получение отзывов для конкретной книги.
     */
    public List<ReviewDto> getReviewsForBook(UUID bookId) {
        String sql = "SELECT id, content, stars, reviewer, book, created_at "
            + "FROM reviews WHERE book = ?";
        return jdbcTemplate.query(sql, new ReviewRowMapper(), bookId);
    }

    /**
     * Создание нового отзыва.
     */
    public void createReview(ReviewDto review) {
        String sql = "INSERT INTO reviews (content, stars, reviewer, book, created_at) "
            + "VALUES (?, ?, ?, ?, ?)";
        jdbcTemplate.update(sql, review.getContent(), review.getStars(), review.getReviewer(),
            review.getBook(),
            review.getCreatedAt() != null ? review.getCreatedAt()
                                           : new Timestamp(System.currentTimeMillis()));
    }

    /**
     * Получение отзыва по ID.
     */
    public ReviewDto getReviewById(int id) {
        String sql = "SELECT id, content, stars, reviewer, book, created_at "
            + "FROM reviews WHERE id = ?";
        return jdbcTemplate.queryForObject(sql, new ReviewRowMapper(), id);
    }

    /**
     * Получение списка всех отзывов.
     */
    public List<ReviewDto> getAllReviews() {
        String sql = "SELECT id, content, stars, reviewer, book, created_at FROM reviews";
        return jdbcTemplate.query(sql, new ReviewRowMapper());
    }

    /**
     * Обновление существующего отзыва.
     * @return количество обновленных записей (0 если не найден)
     */
    public int updateReview(ReviewDto review) {
        String sql = "UPDATE reviews SET content = ?, stars = ? WHERE id = ?";
        return jdbcTemplate.update(sql, review.getContent(), review.getStars(), review.getId());
    }

    /**
     * Удаление отзыва по ID.
     * @return количество удаленных записей (0 если не найден)
     */
    public int deleteReview(int id) {
        String sql = "DELETE FROM reviews WHERE id = ?";
        return jdbcTemplate.update(sql, id);
    }
}
