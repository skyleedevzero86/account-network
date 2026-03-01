package com.sleekydz86.accountnetwork.infrastructure.persistence;

import com.sleekydz86.accountnetwork.application.port.FollowCommandPort;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
public class FollowCommandAdapter implements FollowCommandPort {

    private final AccountJpaRepository jpaRepository;

    public FollowCommandAdapter(AccountJpaRepository jpaRepository) {
        this.jpaRepository = jpaRepository;
    }

    @Override
    @Transactional
    public void follow(String fromUsername, String toUsername) {
        AccountJpa from = jpaRepository.findByUsername(fromUsername).orElseThrow();
        AccountJpa to = jpaRepository.findByUsername(toUsername).orElseThrow();
        from.getFollowing().add(to);
        jpaRepository.save(from);
    }
}
