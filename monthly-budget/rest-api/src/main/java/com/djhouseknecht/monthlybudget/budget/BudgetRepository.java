package com.djhouseknecht.monthlybudget.budget;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;
import java.util.List;

public interface BudgetRepository extends JpaRepository<Budget, Long> {

    /**
     * Set budget item's category to NULL
     * @param username
     * @param category
     */
    @Modifying
    @Transactional
    @Query(value = "UPDATE Budget b set " +
                    "category = NULL " +
                    "WHERE username = :user " +
                        "AND category = :cat")
    void clearCategory(@Param("user") String username, @Param("cat") String category);

    /**
     * Get all budget items for a user by year and month
     * @param username
     * @param year
     * @param month
     * @return
     */
    List<Budget> findAllByUsernameAndYearAndMonth(String username, Integer year, Integer month);
}
