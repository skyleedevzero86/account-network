package com.sleekydz86.accountnetwork.application.usecase;

import com.sleekydz86.accountnetwork.application.port.GraphQueryPort;
import com.sleekydz86.accountnetwork.domain.Graph;
import java.util.Objects;

public final class GetGraphUseCase {

    private final GraphQueryPort graphQuery;

    public GetGraphUseCase(GraphQueryPort graphQuery) {
        this.graphQuery = Objects.requireNonNull(graphQuery);
    }

    public Graph execute() {
        return graphQuery.loadGraph();
    }
}
