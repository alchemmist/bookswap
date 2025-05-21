package com.example.bookswap.service;

import com.example.bookswap.model.UserDto;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.List;
import java.util.UUID;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final JdbcTemplate jdbcTemplate;

    public UserService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private static class UserRowMapper implements RowMapper<UserDto> {
        @Override
        public UserDto mapRow(ResultSet rs, int rowNum) throws SQLException {
            UserDto dto = new UserDto();
            dto.setId(rs.getObject("id", UUID.class));
            dto.setUsername(rs.getString("username"));
            dto.setPassword(rs.getString("password")); // Осторожно с передачей пароля!
            dto.setIs_admin(rs.getBoolean("is_admin"));
            dto.setCreated_at(rs.getTimestamp("created_at"));
            return dto;
        }
    }

    /**
     * Создать нового пользователя
     */
    public UserDto createUser(UserDto user) {
        String sql = """
            INSERT INTO users (username, password, is_admin) 
            VALUES (?, ?, ?) 
            RETURNING id, created_at
            """;
        
        return jdbcTemplate.queryForObject(
            sql,
            new UserRowMapper(),
            user.getUsername(),
            user.getPassword(),
            user.getIs_admin()
        );
    }

    /**
     * Получить всех пользователей
     */
    public List<UserDto> getAllUsers() {
        String sql = "SELECT * FROM users";
        return jdbcTemplate.query(sql, new UserRowMapper());
    }

    /**
     * Получить пользователя по ID
     */
    public UserDto getUserById(UUID id) {
        String sql = "SELECT * FROM users WHERE id = ?";
        return jdbcTemplate.queryForObject(sql, new UserRowMapper(), id);
    }

    /**
     * Обновить пользователя
     */
    public void updateUser(UserDto user) {
        String sql = "UPDATE users SET username = ?, password = ?, is_admin = ? WHERE id = ? ";
        jdbcTemplate.update(
            sql, user.getUsername(), user.getPassword(), user.getIs_admin(), user.getId());
    }

    /**
     * Удалить пользователя по ID
     */
    public void deleteUser(UUID id) {
        String sql = "DELETE FROM users WHERE id = ?";
        jdbcTemplate.update(sql, id);
    }

    /**
     * Найти пользователя по имени
     */
    public UserDto findByUsername(String username) {
        String sql = "SELECT * FROM users WHERE username = ?";
        try {
            return jdbcTemplate.queryForObject(sql, new UserRowMapper(), username);
        } catch (EmptyResultDataAccessException e) {
            return null;
        }
    }
}
