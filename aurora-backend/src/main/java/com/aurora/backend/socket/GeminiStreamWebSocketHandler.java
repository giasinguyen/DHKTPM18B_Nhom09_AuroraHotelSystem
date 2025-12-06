package com.aurora.backend.socket;

import com.aurora.backend.service.RagService;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.*;
import reactor.core.Disposable;

import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Slf4j
@Component
@RequiredArgsConstructor
public class GeminiStreamWebSocketHandler implements WebSocketHandler {

    private final RagService geminiRagService;
    private final ObjectMapper objectMapper = new ObjectMapper();
    private final Map<String, Disposable> subscriptions = new ConcurrentHashMap<>();

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        log.info("WebSocket connected: {}", session.getId());
        sendMessage(session, Map.of(
                "type", "connection",
                "status", "connected",
                "sessionId", session.getId()
        ));
    }

    @Override
    public void handleMessage(WebSocketSession session, WebSocketMessage<?> message) throws Exception {
        if (message instanceof TextMessage) {
            String payload = ((TextMessage) message).getPayload();
            log.info("Received message: {}", payload);

            try {
                Map<String, String> request = objectMapper.readValue(payload, Map.class);
                String userMessage = request.getOrDefault("message", "dịch vụ của khách sạn aurora");
                String chatId = request.getOrDefault("chatId", "1");

                // Hủy subscription cũ nếu có
                Disposable oldSubscription = subscriptions.remove(session.getId());
                if (oldSubscription != null && !oldSubscription.isDisposed()) {
                    oldSubscription.dispose();
                }

                // Stream response
                Disposable subscription = geminiRagService.stream(chatId, userMessage)
                        .doOnNext(chunk -> {
                            try {
                                if (chunk != null && !chunk.trim().isEmpty()) {
                                    sendMessage(session, Map.of(
                                            "type", "chunk",
                                            "data", chunk
                                    ));
                                }
                            } catch (Exception e) {
                                log.error("Error sending chunk: {}", e.getMessage());
                            }
                        })
                        .doOnComplete(() -> {
                            try {
                                sendMessage(session, Map.of(
                                        "type", "complete",
                                        "status", "finished"
                                ));
                                subscriptions.remove(session.getId());
                            } catch (Exception e) {
                                log.error("Error sending completion: {}", e.getMessage());
                            }
                        })
                        .doOnError(error -> {
                            try {
                                log.error("Streaming error: {}", error.getMessage());
                                sendMessage(session, Map.of(
                                        "type", "error",
                                        "message", error.getMessage()
                                ));
                                subscriptions.remove(session.getId());
                            } catch (Exception e) {
                                log.error("Error sending error message: {}", e.getMessage());
                            }
                        })
                        .subscribe();

                subscriptions.put(session.getId(), subscription);

            } catch (Exception e) {
                log.error("Error processing message: {}", e.getMessage());
                sendMessage(session, Map.of(
                        "type", "error",
                        "message", "Invalid message format"
                ));
            }
        }
    }

    @Override
    public void handleTransportError(WebSocketSession session, Throwable exception) throws Exception {
        log.error("Transport error for session {}: {}", session.getId(), exception.getMessage());
        cleanupSession(session);
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus closeStatus) throws Exception {
        log.info("WebSocket disconnected: {} - Status: {}", session.getId(), closeStatus);
        cleanupSession(session);
    }

    @Override
    public boolean supportsPartialMessages() {
        return false;
    }

    private void sendMessage(WebSocketSession session, Map<String, Object> data) throws IOException {
        if (session.isOpen()) {
            String json = objectMapper.writeValueAsString(data);
            session.sendMessage(new TextMessage(json));
        }
    }

    private void cleanupSession(WebSocketSession session) {
        Disposable subscription = subscriptions.remove(session.getId());
        if (subscription != null && !subscription.isDisposed()) {
            subscription.dispose();
        }
    }
}