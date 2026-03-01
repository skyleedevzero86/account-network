package com.sleekydz86.accountnetwork.interfaces.dto;

import jakarta.validation.constraints.NotBlank;

public record AccountRequestDto(@NotBlank(message = "사용자명을 입력하세요.") String username) {}
