package com.example.bookswap.model;

import java.sql.Timestamp;
import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ReviewDto {
    private Integer id;

    private String content;

    private Integer stars;

    private UUID reviewer;

    private UUID book;

    private Timestamp createdAt;
}
