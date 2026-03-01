package com.sleekydz86.accountnetwork.interfaces.dto;

import jakarta.validation.constraints.NotBlank;

public record AccountRequestDto(@NotBlank String username) {}
