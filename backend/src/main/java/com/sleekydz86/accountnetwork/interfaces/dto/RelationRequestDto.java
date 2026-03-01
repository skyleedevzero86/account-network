package com.sleekydz86.accountnetwork.interfaces.dto;

import jakarta.validation.constraints.NotBlank;

public record RelationRequestDto(@NotBlank String start, @NotBlank String end) {}