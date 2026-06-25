package com.example.cropRecommendation.controller;

import com.example.cropRecommendation.DTOs.AuthDTOs.AuthResponseDTO;
import com.example.cropRecommendation.DTOs.AuthDTOs.LoginRequestDTO;
import com.example.cropRecommendation.DTOs.AuthDTOs.SignUpRequestDTO;
import com.example.cropRecommendation.Services.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin("*")
public class AuthController {
    private final AuthService authService;

    @PostMapping("/signup")
    public AuthResponseDTO signup(
           @Valid @RequestBody SignUpRequestDTO request
    ) {

        return authService.signup(request);
    }

    @PostMapping("/login")
    public AuthResponseDTO login(
           @Valid @RequestBody LoginRequestDTO request
    ) {

        return authService.login(request);
    }
}
