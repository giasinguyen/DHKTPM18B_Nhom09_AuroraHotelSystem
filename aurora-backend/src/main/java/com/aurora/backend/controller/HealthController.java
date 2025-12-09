package com.aurora.backend.controller;

import com.aurora.backend.dto.response.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

/**
 * Health Check Controller
 * Provides endpoints for monitoring application health
 */
@RestController
@RequestMapping("/api/v1")
public class HealthController {

    /**
     * Health check endpoint for Railway and monitoring systems
     * 
     * @return Health status
     */
    @GetMapping("/health")
    public ResponseEntity<ApiResponse<Map<String, Object>>> health() {
        Map<String, Object> healthData = new HashMap<>();
        healthData.put("status", "UP");
        healthData.put("timestamp", LocalDateTime.now());
        healthData.put("service", "Aurora Hotel Backend");
        healthData.put("version", "1.0.0");

        return ResponseEntity.ok(
            ApiResponse.<Map<String, Object>>builder()
                .code(HttpStatus.OK.value())
                .message("Service is healthy")
                .result(healthData)
                .build()
        );
    }

    /**
     * Simple ping endpoint
     * 
     * @return Pong response
     */
    @GetMapping("/ping")
    public ResponseEntity<String> ping() {
        return ResponseEntity.ok("pong");
    }
}
