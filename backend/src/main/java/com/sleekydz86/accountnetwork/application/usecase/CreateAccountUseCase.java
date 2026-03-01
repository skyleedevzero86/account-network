package com.sleekydz86.accountnetwork.application.usecase;

import com.sleekydz86.accountnetwork.application.port.AccountRepositoryPort;
import com.sleekydz86.accountnetwork.domain.Account;
import java.util.Objects;

public final class CreateAccountUseCase {

    private final AccountRepositoryPort accountRepository;

    public CreateAccountUseCase(AccountRepositoryPort accountRepository) {
        this.accountRepository = Objects.requireNonNull(accountRepository);
    }

    public Account execute(String username) {
        return accountRepository.save(Account.create(username));
    }
}
