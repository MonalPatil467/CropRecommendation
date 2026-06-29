package com.example.cropRecommendation.controller;

import com.example.cropRecommendation.DTOs.Recommendations.RecommendationRequestDTO;
import com.example.cropRecommendation.DTOs.Recommendations.RecommendationResponseDTO;
import com.example.cropRecommendation.Services.PDFService;
import com.example.cropRecommendation.Services.RecommendationService;
import com.example.cropRecommendation.entity.Recommendations;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/recommendation")
@RequiredArgsConstructor
@CrossOrigin("*")
public class RecommendationController {
    private final RecommendationService recommendationService;

    private final PDFService pdfService;


    @PostMapping
    public RecommendationResponseDTO getRecommendation(
            @RequestBody RecommendationRequestDTO request
    ) {

        return recommendationService.getRecommendation(request);
    }

    @GetMapping("/history")
    public List<Recommendations> getHistory() {
        return recommendationService.getHistory();
    }

    @GetMapping("/pdf/{id}")
    public ResponseEntity<byte[]> downloadPdf(@PathVariable Long id) {

        byte[] pdf = pdfService.generatePdf(id);

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=Crop_Recommendation.pdf")
                .contentType(MediaType.APPLICATION_PDF)
                .body(pdf);
    }
}
