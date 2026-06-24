package com.example.cropRecommendation.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "recommendations")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Recommendations {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String soilType;

    private Double temperature;

    private Double humidity;

    private String rainfall;

    private String season;

    @Column(columnDefinition = "TEXT")
    private String recommendation;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    private LocalDateTime createdAt;
}
