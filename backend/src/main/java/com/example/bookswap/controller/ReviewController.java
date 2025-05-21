package com.example.bookswap.controller;

import com.example.bookswap.model.ReviewDto;
import com.example.bookswap.service.ReviewService;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/reviews")
@Tag(name = "Отзывы", description = "API для управления отзывами")
public class ReviewController {
    private final ReviewService reviewService;

    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    /**
     * GET /api/reviews - получить список всех отзывов
     */
    @GetMapping
    public ResponseEntity<List<ReviewDto>> getAllReviews() {
        List<ReviewDto> reviews = reviewService.getAllReviews();
        return ResponseEntity.ok(reviews);
    }

    /**
     * GET /api/reviews/{id} - получить отзыв по ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<ReviewDto> getReviewById(@PathVariable int id) {
        ReviewDto review = reviewService.getReviewById(id);
        if (review != null) {
            return ResponseEntity.ok(review);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    /**
     * POST /api/reviews - создать новый отзыв
     */
    @PostMapping
    public ResponseEntity<Void> createReview(@RequestBody ReviewDto reviewDto) {
        reviewService.createReview(reviewDto);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    /**
     * PUT /api/reviews/{id} - обновить существующий отзыв
     */
    @PutMapping("/{id}")
    public ResponseEntity<Void> updateReview(
        @PathVariable int id, @RequestBody ReviewDto reviewDto) {
        reviewDto.setId(id);
        int updated = reviewService.updateReview(reviewDto);
        if (updated > 0) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    /**
     * DELETE /api/reviews/{id} - удалить отзыв по ID
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReview(@PathVariable int id) {
        int deleted = reviewService.deleteReview(id);
        if (deleted > 0) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
