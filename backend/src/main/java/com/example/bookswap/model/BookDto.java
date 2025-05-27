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
public class BookDto {
    private UUID id;

    private String title;

    private String author;

    private String cover;

    private UUID responsabile;

    private Timestamp createdAt;
}

