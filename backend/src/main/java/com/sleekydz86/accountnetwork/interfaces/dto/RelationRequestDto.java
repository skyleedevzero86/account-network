package com.sleekydz86.accountnetwork.interfaces.dto;

import jakarta.validation.constraints.NotBlank;

public record RelationRequestDto(
        @NotBlank(message = "팔로우 하는 사용자명을 입력하세요.") String start,
        @NotBlank(message = "팔로우 대상 사용자명을 입력하세요.") String end) {}