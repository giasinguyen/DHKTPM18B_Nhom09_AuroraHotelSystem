package com.aurora.backend.repository;

import com.aurora.backend.entity.ImageAsset;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ImageAssetRepository extends JpaRepository<ImageAsset, Long> {
}
