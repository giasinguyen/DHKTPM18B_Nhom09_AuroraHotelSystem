package com.aurora.backend.repository;

import com.aurora.backend.mapper.DocumentMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.ai.document.Document;
import org.springframework.ai.document.DocumentReader;
import org.springframework.ai.reader.pdf.PagePdfDocumentReader;
import org.springframework.ai.reader.pdf.config.PdfDocumentReaderConfig;
import org.springframework.ai.reader.tika.TikaDocumentReader;
import org.springframework.ai.transformer.splitter.TokenTextSplitter;
import org.springframework.ai.vectorstore.VectorStore;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.*;

@Repository
@RequiredArgsConstructor
public class DocumentRepository {
    private final VectorStore vectorStore;
    private final JdbcTemplate jdbcTemplate;
    private final TokenTextSplitter textSplitter;
    private final PdfDocumentReaderConfig pdfDocumentReaderConfig;

    public Page<Document> getAll(Pageable pageable) {
        String countSql = "SELECT COUNT(*) FROM vector_store";
        int total = jdbcTemplate.queryForObject(countSql, Integer.class);

        String sql = "SELECT id, content, metadata FROM vector_store LIMIT ? OFFSET ?";
        List<Document> documents = jdbcTemplate.query(sql,
                new DocumentMapper(),
                pageable.getPageSize(),
                pageable.getOffset());
        return new PageImpl<>(documents, pageable, total);
    }

    public Optional<Document> getById(String id) {
        String sql = "SELECT id, content, metadata FROM vector_store WHERE id = CAST(? AS UUID);";
        return Optional.of(jdbcTemplate.queryForObject(sql, new DocumentMapper(), id));
    }

    public Document ingestTextDocument(Document document) {
        try {
            List<Document> chunks = textSplitter.split(List.of(document));

            chunks.forEach(doc -> {
                if (doc.getMetadata().get("id") == null) {
                    doc.getMetadata().put("id", UUID.randomUUID().toString());
                }
            });
            vectorStore.add(chunks);
        } catch (Exception e) {
            throw new RuntimeException("Failed to ingest text", e);
        }
        return document;
    }

    public List<Document> ingestTextDocument(List<Document> documents) {
        try {
            List<Document> chunks = textSplitter.split(documents);

            chunks.forEach(doc -> {
                if (doc.getMetadata().get("id") == null) {
                    doc.getMetadata().put("id", UUID.randomUUID().toString());
                }
            });
            vectorStore.add(chunks);
            return chunks;
        } catch (Exception e) {
            throw new RuntimeException("Failed to ingest text", e);
        }
    }

    public List<Document> ingestDocxDocument(Resource docxResource) {
        try {
            TikaDocumentReader tikaReader = new TikaDocumentReader(docxResource);
            List<Document> documents = tikaReader.read();
            List<Document> chunks = chunkingDocuments(documents);
            vectorStore.add(chunks);
            return chunks;
        } catch (RuntimeException e) {
            throw new RuntimeException(e);
        }
    }

    public List<Document> ingestPdfDocument(Resource pdfResource) {
        try {
            DocumentReader reader = new PagePdfDocumentReader(pdfResource, pdfDocumentReaderConfig);
            List<Document> documents = reader.get()
                    .stream()
                    .map(doc ->
                            new Document(Objects.requireNonNull(sanitizeText(doc.getText())))
                    )
                    .toList();

            List<Document> chunks = chunkingDocuments(documents);

            vectorStore.add(chunks);
            return chunks;
        } catch (Exception e) {
            throw new RuntimeException("Failed to ingest document", e);
        }
    }

    public Document update(String id, Document doc) {
        doc.getMetadata().put("id", id);
        delete(id);
        vectorStore.add(Collections.singletonList(doc));
        return doc;
    }

    public void delete(String id) {
        vectorStore.delete("id == '" + id + "'");
    }

    public List<Document> chunkingDocuments(List<Document> documents) {
        List<Document> chunks = textSplitter.split(documents);

        chunks.forEach(doc -> {
            if (doc.getMetadata().get("id") == null) {
                doc.getMetadata().put("id", UUID.randomUUID().toString());
            }
        });
        return chunks;
    }

    public String sanitizeText(String text) {
        if (text == null) return null;
        return text
                .replace("\u0000", "")
                .replaceAll("\\p{Cntrl}", " ")
                .replaceAll("\\s+", " ")
                .trim();
    }
}
