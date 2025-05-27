package com.example.bookswap.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotBlank;
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
public class UserDto {
    private UUID id;

    @NotBlank private String username;

    @NotBlank private String password;

    private String avatar = "";

    @JsonProperty("is_admin") private Boolean isAdmin; 

    @JsonProperty("created_at") private Timestamp createdAt; 
}
