package com.sleekydz86.accountnetwork.interfaces.dto;

import java.util.List;

public record GraphResponseDto(List<NodeDto> nodes, List<EdgeDto> edges) {
    public record NodeDto(Long id, String username) {}
    public record EdgeDto(Long start, Long end) {}
}
