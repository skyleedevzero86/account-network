package com.sleekydz86.accountnetwork.infrastructure.persistence;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;
import java.util.Optional;

public interface AccountJpaRepository extends JpaRepository<AccountJpa, Long> {

    Optional<AccountJpa> findByUsername(String username);

    @Query("SELECT DISTINCT a FROM AccountJpa a LEFT JOIN FETCH a.following")
    List<AccountJpa> findAllWithFollowing();

    @Query(value = "SELECT FROM_ACCOUNT_ID, TO_ACCOUNT_ID FROM FOLLOW", nativeQuery = true)
    List<Object[]> findAllFollowPairs();
}
