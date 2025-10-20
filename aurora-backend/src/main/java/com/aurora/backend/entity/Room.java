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
@Table(uniqueConstraints = @UniqueConstraint(columnNames = {"branch_id", "roomNumber"}))
public class Room {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String id;

    @ManyToOne
    @JoinColumn(name = "branch_id", nullable = false)
    Branch branch; // Changed from Hotel to Branch

    @ManyToOne
    @JoinColumn(name = "room_type_id")
    RoomType roomType;

    @Column(nullable = false)
    String roomNumber;
    Integer floor;
    String status;   // AVAILABLE, OCCUPIED, CLEANING, ...
}
