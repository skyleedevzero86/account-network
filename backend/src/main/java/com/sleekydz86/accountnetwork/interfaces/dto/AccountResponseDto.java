package com.sleekydz86.accountnetwork.interfaces.dto;

import java.util.Set;
public record AccountResponseDto(String username, Set<String> following, Set<String> followers) {}
