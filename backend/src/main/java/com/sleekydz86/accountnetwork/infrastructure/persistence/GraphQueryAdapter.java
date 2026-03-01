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
        List<AccountJpa> all = jpaRepository.findAllWithFollowing();
        List<Graph.NodeView> nodes = all.stream()
                .map(a -> new Graph.NodeView(a.getId(), a.getUsername()))
                .collect(Collectors.toList());
        List<Graph.EdgeView> edges = new ArrayList<>();
        for (AccountJpa a : all) {
            for (AccountJpa f : a.getFollowing()) {
                edges.add(new Graph.EdgeView(a.getId(), f.getId()));
            }
        }
        return Graph.of(nodes, edges);
    }
}