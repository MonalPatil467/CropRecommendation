package com.example.cropRecommendation.DTOs.AuthDTOs;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginRequestDTO {
    private String email;

    private String password;

}
