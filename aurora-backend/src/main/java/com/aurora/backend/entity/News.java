package com.aurora.backend.entity;

import com.aurora.backend.enums.NewsStatus;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Entity
@Table(name = "news")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class News {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String slug;

    @Column(nullable = false)
    private String title;

    @Column(name = "is_public")
    private Boolean isPublic;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "content_json", nullable = false, columnDefinition = "jsonb")
    private Map<String, Object> contentJson;

    @Column(name = "content_html", columnDefinition = "TEXT")
    private String contentHtml;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private NewsStatus status;

    @Column(name = "published_at")
    private ZonedDateTime publishedAt;

    @Column(name = "created_at", nullable = false, updatable = false)
    private ZonedDateTime createdAt;

    @Column(name = "updated_at")
    private ZonedDateTime updatedAt;

    @OneToMany(mappedBy = "news", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ImageAsset> images = new ArrayList<>();

    // Helper methods
    public void addImage(ImageAsset image) {
        images.add(image);
        image.setNews(this);
    }

    public void removeImage(ImageAsset image) {
        images.remove(image);
        image.setNews(null);
    }

    @PrePersist
    protected void onCreate() {
        createdAt = ZonedDateTime.now();
        updatedAt = ZonedDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = ZonedDateTime.now();
    }
}