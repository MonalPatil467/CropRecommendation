package com.example.cropRecommendation.Services;

import com.example.cropRecommendation.DTOs.AuthDTOs.AuthResponseDTO;
import com.example.cropRecommendation.DTOs.AuthDTOs.LoginRequestDTO;
import com.example.cropRecommendation.DTOs.AuthDTOs.SignUpRequestDTO;
import com.example.cropRecommendation.Repository.UserRepository;
import com.example.cropRecommendation.entity.User;
import com.example.cropRecommendation.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    private final JwtService jwtService;

    public AuthResponseDTO signup(
            SignUpRequestDTO request
    ) {

        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(
                        passwordEncoder.encode(
                                request.getPassword()
                        )
                )
                .createdAt(LocalDateTime.now())
                .build();

        userRepository.save(user);

        String token =
                jwtService.generateToken(user.getEmail());

        return AuthResponseDTO.builder()
                .token(token)
                .message("User Registered Successfully")
                .build();
    }

    public AuthResponseDTO login(
            LoginRequestDTO request
    ) {

        User user = userRepository.findByEmail(
                        request.getEmail()
                )
                .orElseThrow(() ->
                        new RuntimeException("User Not Found")
                );

        boolean passwordMatches =
                passwordEncoder.matches(
                        request.getPassword(),
                        user.getPassword()
                );

        if (!passwordMatches) {
            throw new RuntimeException("Invalid Password");
        }

        String token =
                jwtService.generateToken(user.getEmail());

        return AuthResponseDTO.builder()
                .token(token)
                .message("Login Successful")
                .build();
    }
}
