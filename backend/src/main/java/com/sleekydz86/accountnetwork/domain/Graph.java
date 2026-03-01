package com.sleekydz86.accountnetwork.domain;


import java.util.List;
import java.util.Objects;

public final class Graph {

    private final List<NodeView> nodes;
    private final List<EdgeView> edges;

    private Graph(List<NodeView> nodes, List<EdgeView> edges) {
        this.nodes = List.copyOf(Objects.requireNonNull(nodes));
        this.edges = List.copyOf(Objects.requireNonNull(edges));
    }

    public static Graph of(List<NodeView> nodes, List<EdgeView> edges) {
        return new Graph(nodes, edges);
    }

    public List<NodeView> getNodes() {
        return nodes;
    }

    public List<EdgeView> getEdges() {
        return edges;
    }

    public record NodeView(Long id, String username) {}
    public record EdgeView(Long startId, Long endId) {}
}
