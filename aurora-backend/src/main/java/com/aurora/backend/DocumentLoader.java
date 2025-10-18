package com.aurora.backend;

import com.aurora.backend.repository.DocumentRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.ai.document.Document;
import org.springframework.boot.CommandLineRunner;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Stream;

@Component
@RequiredArgsConstructor
public class DocumentLoader implements CommandLineRunner {

    private final DocumentRepository documentRepository;
    private final Logger logger = LoggerFactory.getLogger(DocumentLoader.class);

    @Override
    public void run(String... args) throws Exception {
        if (!documentRepository.getAll(Pageable.unpaged()).isEmpty()) {
            logger.info("--->Document already loaded!");
            return;
        }

        List<Document> docs = new ArrayList<>();

        Path dir = Paths.get("src/main/resources/documents");
        if (Files.exists(dir)) {
            try (Stream<Path> files = Files.list(dir)) {
                files.filter(p -> p.toString().endsWith(".md"))
                        .forEach(p -> {
                            try {
                                String content = Files.readString(p);
                                docs.add(new Document(content));
                            } catch (IOException e) {
                                throw new RuntimeException();
                            }
                        });
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }
        List<Document> documents = documentRepository.ingestTextDocument(docs);
        logger.info("--->New document loaded: {}", documents.stream().map(Document::getId));
    }
}
