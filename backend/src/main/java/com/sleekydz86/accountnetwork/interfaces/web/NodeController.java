package com.sleekydz86.accountnetwork.interfaces.web;

import com.sleekydz86.accountnetwork.application.usecase.CreateAccountUseCase;
import com.sleekydz86.accountnetwork.application.usecase.GetAccountUseCase;
import com.sleekydz86.accountnetwork.domain.Account;
import com.sleekydz86.accountnetwork.interfaces.dto.AccountRequestDto;
import com.sleekydz86.accountnetwork.interfaces.dto.AccountResponseDto;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/node")
public class NodeController {

    private final CreateAccountUseCase createAccountUseCase;
    private final GetAccountUseCase getAccountUseCase;

    public NodeController(CreateAccountUseCase createAccountUseCase, GetAccountUseCase getAccountUseCase) {
        this.createAccountUseCase = createAccountUseCase;
        this.getAccountUseCase = getAccountUseCase;
    }

    @PostMapping
    public ResponseEntity<Void> createNode(@RequestBody @Valid AccountRequestDto dto) {
        createAccountUseCase.execute(dto.username());
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @GetMapping("/{username}")
    public ResponseEntity<AccountResponseDto> getNode(@PathVariable String username) {
        return getAccountUseCase.execute(username)
                .map(this::toResponse)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    private AccountResponseDto toResponse(Account account) {
        return new AccountResponseDto(
                account.getUsername(),
                account.getFollowing(),
                account.getFollowers()
        );
    }
}
