package com.sleekydz86.accountnetwork.application.port;

public interface FollowCommandPort {

    void follow(String fromUsername, String toUsername);
}
