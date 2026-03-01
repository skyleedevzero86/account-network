package com.sleekydz86.accountnetwork.domain;


import java.util.Collections;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

public final class Account {

    private final Long id;
    private final String username;
    private final Set<String> following;
    private final Set<String> followers;

    private Account(Long id, String username, Set<String> following, Set<String> followers) {
        this.id = id;
        this.username = Objects.requireNonNull(username);
        this.following = following == null ? Set.of() : Set.copyOf(following);
        this.followers = followers == null ? Set.of() : Set.copyOf(followers);
    }

    public static Account of(Long id, String username, Set<String> following, Set<String> followers) {
        return new Account(id, username, following, followers);
    }

    public static Account create(String username) {
        return new Account(null, username, Set.of(), Set.of());
    }

    public Long getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public Set<String> getFollowing() {
        return Collections.unmodifiableSet(following);
    }

    public Set<String> getFollowers() {
        return Collections.unmodifiableSet(followers);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Account account = (Account) o;
        return Objects.equals(id, account.id) && Objects.equals(username, account.username);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, username);
    }
}
