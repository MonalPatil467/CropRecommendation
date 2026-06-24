package com.example.cropRecommendation.DTOs.AuthDTOs;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@Builder
public class AuthResponseDTO {
    private String token;

    private String message;
}
