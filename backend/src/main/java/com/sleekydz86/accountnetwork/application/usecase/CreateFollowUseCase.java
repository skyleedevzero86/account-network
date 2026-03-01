package com.sleekydz86.accountnetwork.application.usecase;

import com.sleekydz86.accountnetwork.application.port.FollowCommandPort;
import java.util.Objects;

public final class CreateFollowUseCase {

    private final FollowCommandPort followCommand;

    public CreateFollowUseCase(FollowCommandPort followCommand) {
        this.followCommand = Objects.requireNonNull(followCommand);
    }

    public void execute(String fromUsername, String toUsername) {
        followCommand.follow(fromUsername, toUsername);
    }
}
