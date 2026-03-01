package com.sleekydz86.accountnetwork.infrastructure.persistence;


import com.sleekydz86.accountnetwork.application.port.AccountRepositoryPort;
import com.sleekydz86.accountnetwork.domain.Account;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Component;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Component
@Transactional(readOnly = true)
public class AccountRepositoryAdapter implements AccountRepositoryPort {

    private final AccountJpaRepository jpaRepository;

    public AccountRepositoryAdapter(AccountJpaRepository jpaRepository) {
        this.jpaRepository = jpaRepository;
    }

    @Override
    @Transactional
    public Account save(Account account) {
        AccountJpa jpa = toJpa(account);
        AccountJpa saved = jpaRepository.save(jpa);
        return toDomain(saved);
    }

    @Override
    public Optional<Account> findByUsername(String username) {
        return jpaRepository.findByUsername(username).map(this::toDomain);
    }

    @Override
    public List<Account> findAllWithRelations() {
        return jpaRepository.findAllWithFollowing().stream()
                .map(this::toDomain)
                .collect(Collectors.toList());
    }

    private AccountJpa toJpa(Account domain) {
        AccountJpa jpa = new AccountJpa();
        jpa.setId(domain.getId());
        jpa.setUsername(domain.getUsername());
        return jpa;
    }

    private Account toDomain(AccountJpa jpa) {
        var following = jpa.getFollowing().stream()
                .map(AccountJpa::getUsername)
                .collect(Collectors.toSet());
        var followers = jpa.getFollowers().stream()
                .map(AccountJpa::getUsername)
                .collect(Collectors.toSet());
        return Account.of(jpa.getId(), jpa.getUsername(), following, followers);
    }
}
