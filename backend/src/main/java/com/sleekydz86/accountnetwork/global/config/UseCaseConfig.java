package com.sleekydz86.accountnetwork.global.config;

import com.sleekydz86.accountnetwork.application.port.AccountRepositoryPort;
import com.sleekydz86.accountnetwork.application.port.FollowCommandPort;
import com.sleekydz86.accountnetwork.application.port.GraphQueryPort;
import com.sleekydz86.accountnetwork.application.usecase.CreateAccountUseCase;
import com.sleekydz86.accountnetwork.application.usecase.CreateFollowUseCase;
import com.sleekydz86.accountnetwork.application.usecase.GetAccountUseCase;
import com.sleekydz86.accountnetwork.application.usecase.GetGraphUseCase;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class UseCaseConfig {

    @Bean
    public CreateAccountUseCase createAccountUseCase(AccountRepositoryPort accountRepository) {
        return new CreateAccountUseCase(accountRepository);
    }

    @Bean
    public GetAccountUseCase getAccountUseCase(AccountRepositoryPort accountRepository) {
        return new GetAccountUseCase(accountRepository);
    }

    @Bean
    public CreateFollowUseCase createFollowUseCase(FollowCommandPort followCommand) {
        return new CreateFollowUseCase(followCommand);
    }

    @Bean
    public GetGraphUseCase getGraphUseCase(GraphQueryPort graphQuery) {
        return new GetGraphUseCase(graphQuery);
    }
}
