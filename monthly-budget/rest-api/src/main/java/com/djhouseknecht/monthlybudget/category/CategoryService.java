package com.djhouseknecht.monthlybudget.category;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    /**
     * Check to see if a category already exsists
     *  If yes, return it
     *  If no, create and return it
     * @param user
     * @param categoryName
     * @return
     */
    public Category createCategoryIfDoesNotExist(String user, String categoryName) {
        Optional<Category> optionalCategory = categoryRepository.findOneByCategory(categoryName);
        if (!optionalCategory.isPresent()) {
            Category category = new Category();
            category.setCategory(categoryName);
            category.setUsername(user);
            categoryRepository.save(category);
            return category;
        }
        return optionalCategory.get();
    }
}
