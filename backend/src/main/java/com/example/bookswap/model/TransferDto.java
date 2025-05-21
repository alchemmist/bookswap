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
public class TransferDto {
    private Integer id;

    private UUID sender;

    private UUID reciver;

    private Boolean is_closed;

    private Integer place;

    private UUID book;

    private Timestamp created_at;

    private Timestamp closed_at;
}
