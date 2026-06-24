package com.example.cropRecommendation.Repository;

import com.example.cropRecommendation.entity.Recommendations;

import org.springframework.data.jpa.repository.JpaRepository;

public interface RecommendationRepository extends JpaRepository<Recommendations, Long> {
}
