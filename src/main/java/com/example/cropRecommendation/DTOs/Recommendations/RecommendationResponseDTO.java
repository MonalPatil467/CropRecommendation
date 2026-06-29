package com.example.cropRecommendation.DTOs.Recommendations;

import com.example.cropRecommendation.DTOs.comparision.CropComparisonDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@Builder
public class RecommendationResponseDTO {
    private String recommendation;

    private List<CropComparisonDTO> topCrops;

}
