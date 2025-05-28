package com.example.bookswap.service;

import com.example.bookswap.model.PlaceDto;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Service;

@Service
public class PlaceService {
    private final JdbcTemplate jdbcTemplate;

    public PlaceService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private static class PlaceRowMapper implements RowMapper<PlaceDto> {
        @Override
        public PlaceDto mapRow(ResultSet rs, int rowNum) throws SQLException {
            PlaceDto dto = new PlaceDto();
            dto.setId(rs.getInt("id"));
            dto.setTitle(rs.getString("title"));
            dto.setFull_address(rs.getString("full_address")); 
            return dto;
        }
    }

    public List<PlaceDto> getAllPlaces() {
        String sql = "SELECT * FROM places";
        return jdbcTemplate.query(sql, new PlaceRowMapper());
    }

    public PlaceDto getPlaceById(Integer id) {
        String sql = "SELECT * FROM places WHERE id = ?";
        return jdbcTemplate.queryForObject(sql, new PlaceRowMapper(), id);
    }

    public void createPlace(PlaceDto place) {
        String sql = "INSERT INTO places (title, full_address) VALUES (?, ?)";
        jdbcTemplate.update(sql, place.getTitle(), place.getFull_address());
    }

    public void updatePlace(PlaceDto place) {
        String sql = "UPDATE places SET title = ?, full_address = ? WHERE id = ?";
        jdbcTemplate.update(sql, place.getTitle(), place.getFull_address(), place.getId());
    }

    public void deletePlace(Integer id) {
        String sql = "DELETE FROM places WHERE id = ?";
        jdbcTemplate.update(sql, id);
    }
}
