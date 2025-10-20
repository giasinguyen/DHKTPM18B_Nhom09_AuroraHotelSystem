package com.aurora.backend.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
public class Service {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String id;

    @ManyToOne
    @JoinColumn(name = "branch_id", nullable = false)
    Branch branch; // Changed from Hotel to Branch

    @Column(nullable = false)
    String name; // Spa, Airport Pickup...
    String type;        // SPA, TOUR, TRANSFER...
    String description;
    Double basePrice;
}
