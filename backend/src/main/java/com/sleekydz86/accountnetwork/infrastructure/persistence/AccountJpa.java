package com.sleekydz86.accountnetwork.infrastructure.persistence;

import jakarta.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "ACCOUNT")
public class AccountJpa {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String username;

    @ManyToMany
    @JoinTable(
            name = "FOLLOW",
            joinColumns = @JoinColumn(name = "FROM_ACCOUNT_ID"),
            inverseJoinColumns = @JoinColumn(name = "TO_ACCOUNT_ID")
    )
    private Set<AccountJpa> following = new HashSet<>();

    @ManyToMany(mappedBy = "following")
    private Set<AccountJpa> followers = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Set<AccountJpa> getFollowing() {
        return following;
    }

    public void setFollowing(Set<AccountJpa> following) {
        this.following = following;
    }

    public Set<AccountJpa> getFollowers() {
        return followers;
    }

    public void setFollowers(Set<AccountJpa> followers) {
        this.followers = followers;
    }
}
