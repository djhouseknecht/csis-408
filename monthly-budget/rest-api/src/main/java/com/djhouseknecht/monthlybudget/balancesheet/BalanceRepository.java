package com.djhouseknecht.monthlybudget.balancesheet;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;
import java.util.List;

public interface BalanceRepository extends JpaRepository<BalanceSheet, Long> {

    /**
     * Set budget item's category to NULL
     * @param username
     * @param category
     */
    @Modifying
    @Transactional
    @Query(value = "UPDATE BalanceSheet b set " +
            "category = NULL " +
            "WHERE username = :user " +
            "AND category = :cat")
    void clearCategory(@Param("user") String username, @Param("cat") String category);

    /**
     * Get all balance sheet for a user by year and month
     * @param username
     * @param year
     * @param month
     * @return
     */
    @Query(value = "SELECT b from BalanceSheet b " +
                    "WHERE username = :user " +
                    "AND to_char(date,'yyyy') = :year " +
                    "AND to_char(date, 'M') = :month " +
                    "ORDER BY date DESC")
    List<BalanceSheet> findAllByUsernameAndYearAndMonth(@Param("user") String username, @Param("year") Integer year, @Param("month") Integer month);

    /**
     * Find all balance sheet items for a given username and year
     * @param username
     * @param year
     * @return
     */
    @Query(value = "SELECT b from BalanceSheet b " +
            "WHERE username = :user " +
            "AND to_char(date, 'yyyy') = :year " +
            "ORDER BY date DESC")
    List<BalanceSheet> findAllByUsernameAndYear(@Param("user") String username, @Param("year") Integer year);

    /**
     * Find all balance sheet items for a given username
     * @param username
     * @return
     */
    @Query(value = "SELECT b from BalanceSheet b " +
            "WHERE username = :user " +
            "ORDER BY date DESC")
    List<BalanceSheet> findAllByUsername(@Param("user") String username);
}
