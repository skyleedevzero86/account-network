package com.sleekydz86.accountnetwork.infrastructure.persistence;

import com.sleekydz86.accountnetwork.application.port.GraphQueryPort;
import com.sleekydz86.accountnetwork.domain.Graph;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class GraphQueryAdapter implements GraphQueryPort {

    private final AccountJpaRepository jpaRepository;

    public GraphQueryAdapter(AccountJpaRepository jpaRepository) {
        this.jpaRepository = jpaRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public Graph loadGraph() {
        List<Graph.NodeView> nodes = jpaRepository.findAllIdAndUsername().stream()
                .map(row -> {
                    Long id = row[0] instanceof Number n ? n.longValue() : null;
                    String username = row[1] != null ? row[1].toString() : "";
                    return new Graph.NodeView(id, username);
                })
                .filter(n -> n.id() != null)
                .collect(Collectors.toList());
        List<Graph.EdgeView> edges = new ArrayList<>();
        for (Object[] row : jpaRepository.findAllFollowPairs()) {
            Long fromId = row[0] instanceof Number n ? n.longValue() : null;
            Long toId = row[1] instanceof Number n ? n.longValue() : null;
            if (fromId != null && toId != null) {
                edges.add(new Graph.EdgeView(fromId, toId));
            }
        }
        return Graph.of(nodes, edges);
    }
}