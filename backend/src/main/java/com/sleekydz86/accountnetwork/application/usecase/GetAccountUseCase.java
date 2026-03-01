package com.sleekydz86.accountnetwork.application.usecase;

import com.sleekydz86.accountnetwork.application.port.AccountRepositoryPort;
import com.sleekydz86.accountnetwork.domain.Account;
import java.util.Objects;
import java.util.Optional;

public final class GetAccountUseCase {

    private final AccountRepositoryPort accountRepository;

    public GetAccountUseCase(AccountRepositoryPort accountRepository) {
        this.accountRepository = Objects.requireNonNull(accountRepository);
    }

    public Optional<Account> execute(String username) {
        return accountRepository.findByUsername(username);
    }
}
