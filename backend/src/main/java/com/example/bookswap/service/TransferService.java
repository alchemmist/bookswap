package com.example.bookswap.service;

import com.example.bookswap.model.TransferDto;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.List;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Service;

@Service
public class TransferService {
    private final JdbcTemplate jdbcTemplate;

    public TransferService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private static class TransferRowMapper implements RowMapper<TransferDto> {
        @Override
        public TransferDto mapRow(ResultSet rs, int rowNum) throws SQLException {
            TransferDto dto = new TransferDto();
            dto.setId(rs.getInt("id"));
            dto.setSender((java.util.UUID) rs.getObject("sender"));
            dto.setReciver((java.util.UUID) rs.getObject("receiver"));
            dto.setIs_closed(rs.getBoolean("is_closed"));
            dto.setPlace(rs.getInt("place"));
            dto.setBook((java.util.UUID) rs.getObject("book"));
            dto.setCreated_at(rs.getTimestamp("created_at"));
            dto.setClosed_at(rs.getTimestamp("closed_at"));
            return dto;
        }
    }

    /**
     * Создать новый transfer
     */
    public void createTransfer(TransferDto transfer) {
        String sql = "INSERT INTO transfers (sender, receiver, is_closed, place, book, created_at, "
            + "closed_at) VALUES (?, ?, ?, ?, ?, ?, ?)";
        jdbcTemplate.update(sql, transfer.getSender(), transfer.getReciver(),
            transfer.getIs_closed(), transfer.getPlace(), transfer.getBook(),
            transfer.getCreated_at() != null ? transfer.getCreated_at()
                                             : new Timestamp(System.currentTimeMillis()),
            transfer.getClosed_at());
    }

    /**
     * Получить transfer по ID
     */
    public TransferDto getTransferById(int id) {
        String sql = "SELECT id, sender, receiver, is_closed, place, book, created_at, closed_at "
            + "FROM transfers WHERE id = ?";
        return jdbcTemplate.queryForObject(sql, new TransferRowMapper(), id);
    }

    /**
     * Получить все transfers
     */
    public List<TransferDto> getAllTransfers() {
        String sql = "SELECT id, sender, receiver, is_closed, place, book, created_at, closed_at "
            + "FROM transfers";
        return jdbcTemplate.query(sql, new TransferRowMapper());
    }

    /**
     * Обновить существующий transfer
     * @return количество обновленных записей
     */
    public int updateTransfer(TransferDto transfer) {
        String sql = "UPDATE transfers SET sender = ?, receiver = ?, is_closed = ?, place = ?, "
            + "book = ?, closed_at = ? WHERE id = ?";
        return jdbcTemplate.update(sql, transfer.getSender(), transfer.getReciver(),
            transfer.getIs_closed(), transfer.getPlace(), transfer.getBook(),
            transfer.getClosed_at(), transfer.getId());
    }

    /**
     * Удалить transfer по ID
     * @return количество удаленных записей
     */
    public int deleteTransfer(int id) {
        String sql = "DELETE FROM transfers WHERE id = ?";
        return jdbcTemplate.update(sql, id);
    }
}
