package com.sleekydz86.accountnetwork.application.port;

import com.sleekydz86.accountnetwork.domain.Account;
import java.util.List;
import java.util.Optional;

public interface AccountRepositoryPort {

    Account save(Account account);

    Optional<Account> findByUsername(String username);

    List<Account> findAllWithRelations();
}
