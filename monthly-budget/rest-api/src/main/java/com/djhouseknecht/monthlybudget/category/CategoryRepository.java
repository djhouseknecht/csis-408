package com.djhouseknecht.monthlybudget.category;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    public List<Category> findAllByUsername(String username);

    public Optional<Category> findOneByCategory(String category);
}
