package com.aurora.backend.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Set;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
public class RoomType {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String id;

    @ManyToOne
    @JoinColumn(name = "branch_id", nullable = false)
    Branch branch; // Changed from Hotel to Branch

    @Column(nullable = false)
    String name;   // Deluxe, Suite...
    String code;
    Integer capacityAdults;
    Integer capacityChildren;
    Double sizeM2;
    Boolean refundable;

    @OneToMany(mappedBy = "roomType")
    Set<Room> rooms;

    @ManyToMany
    @JoinTable(name = "room_type_amenities",
            joinColumns = @JoinColumn(name = "room_type_id"),
            inverseJoinColumns = @JoinColumn(name = "amenity_id"))
    Set<Amenity> amenities;
}
