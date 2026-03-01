package com.sleekydz86.accountnetwork.interfaces.web;

import com.sleekydz86.accountnetwork.application.usecase.GetGraphUseCase;
import com.sleekydz86.accountnetwork.domain.Graph;
import com.sleekydz86.accountnetwork.interfaces.dto.GraphResponseDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/graph")
public class GraphController {

    private final GetGraphUseCase getGraphUseCase;

    public GraphController(GetGraphUseCase getGraphUseCase) {
        this.getGraphUseCase = getGraphUseCase;
    }

    @GetMapping
    public ResponseEntity<GraphResponseDto> getGraph() {
        Graph graph = getGraphUseCase.execute();
        List<GraphResponseDto.NodeDto> nodes = graph.getNodes().stream()
                .map(n -> new GraphResponseDto.NodeDto(n.id(), n.username()))
                .collect(Collectors.toList());
        List<GraphResponseDto.EdgeDto> edges = graph.getEdges().stream()
                .map(e -> new GraphResponseDto.EdgeDto(e.startId(), e.endId()))
                .collect(Collectors.toList());
        return ResponseEntity.ok(new GraphResponseDto(nodes, edges));
    }
}