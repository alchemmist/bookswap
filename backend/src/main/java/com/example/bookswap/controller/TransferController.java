package com.example.bookswap.controller;

import com.example.bookswap.model.TransferDto;
import com.example.bookswap.service.TransferService;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/transfers")
@Tag(name = "Трансферы", description = "API для управления трансферами")
public class TransferController {
    private final TransferService transferService;

    public TransferController(TransferService transferService) {
        this.transferService = transferService;
    }

    /**
     * GET /api/transfers - получить список всех трансферов
     */
    @GetMapping
    public ResponseEntity<List<TransferDto>> getAllTransfers() {
        List<TransferDto> list = transferService.getAllTransfers();
        return ResponseEntity.ok(list);
    }

    /**
     * GET /api/transfers/{id} - получить трансфер по ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<TransferDto> getTransferById(@PathVariable int id) {
        TransferDto dto = transferService.getTransferById(id);
        if (dto != null) {
            return ResponseEntity.ok(dto);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    /**
     * POST /api/transfers - создать новый трансфер
     */
    @PostMapping
    public ResponseEntity<Void> createTransfer(@RequestBody TransferDto transferDto) {
        transferService.createTransfer(transferDto);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    /**
     * PATCH /api/transfers/{id}/close - закрыть трансфер
     */
    @PatchMapping("/{id}/close")
    public ResponseEntity<Void> closeTransfer(@PathVariable int id) {
        // Получаем текущий трансфер
        TransferDto dto = transferService.getTransferById(id);
        if (dto == null) {
            return ResponseEntity.notFound().build();
        }
        dto.setIs_closed(true);
        dto.setClosed_at(new java.sql.Timestamp(System.currentTimeMillis()));
        int updated = transferService.updateTransfer(dto);
        if (updated > 0) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * DELETE /api/transfers/{id} - удалить трансфер по ID
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTransfer(@PathVariable int id) {
        int deleted = transferService.deleteTransfer(id);
        if (deleted > 0) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
