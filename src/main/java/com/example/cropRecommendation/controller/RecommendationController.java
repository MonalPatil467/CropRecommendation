package com.example.cropRecommendation.controller;

import com.example.cropRecommendation.DTOs.Recommendations.RecommendationRequestDTO;
import com.example.cropRecommendation.DTOs.Recommendations.RecommendationResponseDTO;
import com.example.cropRecommendation.Services.RecommendationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/recommendation")
@RequiredArgsConstructor
@CrossOrigin("*")
public class RecommendationController {
    private final RecommendationService recommendationService;

    @PostMapping
    public RecommendationResponseDTO getRecommendation(
            @RequestBody RecommendationRequestDTO request
    ) {

        return recommendationService.getRecommendation(request);
    }
}
