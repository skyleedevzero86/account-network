package com.sleekydz86.accountnetwork.interfaces.web;

import com.sleekydz86.accountnetwork.application.usecase.CreateFollowUseCase;
import com.sleekydz86.accountnetwork.interfaces.dto.RelationRequestDto;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/relationship")
public class RelationController {

    private final CreateFollowUseCase createFollowUseCase;

    public RelationController(CreateFollowUseCase createFollowUseCase) {
        this.createFollowUseCase = createFollowUseCase;
    }

    @PostMapping
    public ResponseEntity<Void> createRelationship(@RequestBody @Valid RelationRequestDto dto) {
        createFollowUseCase.execute(dto.start(), dto.end());
        return ResponseEntity.ok().build();
    }
}
