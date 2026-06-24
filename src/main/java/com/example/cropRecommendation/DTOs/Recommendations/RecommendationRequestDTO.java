package com.example.cropRecommendation.DTOs.Recommendations;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class RecommendationRequestDTO {
    private String soilType;

    private Double temperature;

    private Double humidity;

    private String rainfall;

    private String season;

    private String language;
}
