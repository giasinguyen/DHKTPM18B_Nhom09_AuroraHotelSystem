package com.aurora.backend.mapper;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.ai.document.Document;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Map;


@Component
public class DocumentMapper implements RowMapper<Document> {
    private final ObjectMapper objectMapper = new ObjectMapper();
    @Override
    public Document mapRow(ResultSet rs, int rowNum) throws SQLException {
        String id = rs.getString("id");
        String content = rs.getString("content");
        String metadataJson = rs.getString("metadata");

        Map<String, Object> metadata;
        try {
            metadata = objectMapper.readValue(metadataJson, Map.class);
        } catch (JsonProcessingException e) {
            metadata = Map.of();
        }

        metadata.put("id", id);
        Document document = new Document(content, metadata);
        return document;
    }
}
