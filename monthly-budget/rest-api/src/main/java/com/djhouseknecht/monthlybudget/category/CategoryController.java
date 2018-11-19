package com.djhouseknecht.monthlybudget.category;

import com.djhouseknecht.monthlybudget.budget.BudgetRepository;
import com.djhouseknecht.monthlybudget.user.UserService;
import com.djhouseknecht.monthlybudget.util.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

/**
 * Controller to handle all HTTP request concerning category items
 */
@RestController
@RequestMapping(value = "/category")
public class CategoryController {

    @Autowired
    private UserService userService;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private BudgetRepository budgetRepository;

    @GetMapping
    public Response getAllUsersCategories() {
        List<Category> categories = categoryRepository.findAllByUsername(userService.getUsername());
        return new Response(HttpStatus.OK, categories);
    }

    /**
     * Get a Category by ID
     * @param id
     * @return
     */
    @GetMapping(value = "/{id}")
    public Response getCategory(@PathVariable Long id) {
        Optional<Category> category = categoryRepository.findById(id);
        if (!category.isPresent()) {
            return new Response(HttpStatus.NOT_FOUND);
        }
        return new Response(HttpStatus.OK, category.get());
    }

    /**
     * Create a new Category
     * @param category
     * @return
     */
    @PostMapping
    public Response createCategory(@RequestBody Category category) {
        category.setUsername(userService.getUsername());
        categoryRepository.save(category);
        return new Response(HttpStatus.CREATED, category);
    }

    /**
     * Update an existing category
     * @param id
     * @param updatedCategory
     * @return
     */
    @PutMapping(value = "/{id}")
    public Response updateCategory(@PathVariable Long id, @RequestBody Category updatedCategory) {
        Optional<Category> optionalCategory = categoryRepository.findById(id);

        if (!optionalCategory.isPresent()) {
            return new Response(HttpStatus.NOT_FOUND);
        }

        Category category = optionalCategory.get();
        category.setCategory(updatedCategory.getCategory());
        categoryRepository.save(category);

        return new Response(HttpStatus.OK, category);
    }

    /**
     * Delete an existing category and set all budget items' and
     *  balance sheet items' categories to NULL
     * @param id
     * @return
     */
    @DeleteMapping(value = "/{id}")
    public Response deleteCategory(@PathVariable Long id) {
        Optional<Category> optionalCategory = categoryRepository.findById(id);
        if (!optionalCategory.isPresent()) {
            return new Response(HttpStatus.NOT_FOUND);
        }

        Category category = optionalCategory.get();

        /* clear all budget categories before deleting category*/
        budgetRepository.clearCategory(userService.getUsername(), category.getCategory());
        /* TODO: clear all balance sheet categories before deleting category */

        categoryRepository.delete(category);

        return new Response(HttpStatus.OK);
    }

}
