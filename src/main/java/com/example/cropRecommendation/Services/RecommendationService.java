package com.example.cropRecommendation.Services;

import com.example.cropRecommendation.DTOs.Recommendations.RecommendationRequestDTO;
import com.example.cropRecommendation.DTOs.Recommendations.RecommendationResponseDTO;
import com.example.cropRecommendation.Repository.RecommendationRepository;
import com.example.cropRecommendation.entity.Recommendations;
import com.example.cropRecommendation.prompt.PromptTemplates;
import lombok.RequiredArgsConstructor;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class RecommendationService {
    private final RecommendationRepository repository;
    private final ChatClient.Builder chatClientBuilder;

    public RecommendationResponseDTO getRecommendation(
            RecommendationRequestDTO request
    ) {

        try {

            System.out.println("Step 1: Request received");

            ChatClient chatClient = chatClientBuilder.build();

            String prompt =
                    PromptTemplates.buildCropRecommendationPrompt(
                            request.getSoilType(),
                            request.getTemperature(),
                            request.getHumidity(),
                            request.getRainfall(),
                            request.getSeason(),
                            request.getLanguage()
                    );

            System.out.println("Step 2: Prompt built");

            String aiResponse =
                    chatClient.prompt()
                            .user(prompt)
                            .call()
                            .content();

            System.out.println("Step 3: AI response received");

            Recommendations recommendation =
                    Recommendations.builder()
                            .soilType(request.getSoilType())
                            .temperature(request.getTemperature())
                            .humidity(request.getHumidity())
                            .rainfall(request.getRainfall())
                            .season(request.getSeason())
                            .recommendation(aiResponse)
                            .createdAt(LocalDateTime.now())
                            .build();

            System.out.println("Step 4: Saving to database");

            repository.save(recommendation);

            System.out.println("Step 5: Saved successfully");

            return RecommendationResponseDTO.builder()
                    .recommendation(aiResponse)
                    .build();

        } catch (Exception e) {

            e.printStackTrace();

            return RecommendationResponseDTO.builder()
                    .recommendation("Unable to generate recommendation: "
                            + e.getMessage())
                    .build();
        }
    }
}
