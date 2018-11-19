package com.djhouseknecht.monthlybudget.budget;

import com.djhouseknecht.monthlybudget.category.Category;
import com.djhouseknecht.monthlybudget.category.CategoryRepository;
import com.djhouseknecht.monthlybudget.user.UserService;
import com.djhouseknecht.monthlybudget.util.Response;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

/**
 * Controller to handle all HTTP request concerning budget items
 */
@RestController
@RequestMapping(value = "/budget")
public class BudgetController {

    Logger logger = LoggerFactory.getLogger(BudgetController.class);

    @Autowired
    private UserService userService;

    @Autowired
    private BudgetRepository budgetRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @GetMapping(value = "/{year}/{month}")
    public Response getBudgetItems(@PathVariable Integer year, @PathVariable Integer month) {
        List<Budget> budgets = budgetRepository.findAllByUsernameAndYearAndMonth(userService.getUsername(), year, month);
        return new Response(HttpStatus.OK, budgets);
    }

    /**
     * Update an existing budget item
     * @param id
     * @param updatedBudget
     * @return
     */
    @PutMapping(value = "/{id}")
    public Response updateBudgetItem(@PathVariable Long id, @RequestBody Budget updatedBudget) {
        Optional<Budget> optionalBudget = budgetRepository.findById(id);
        if (!optionalBudget.isPresent()) {
            return new Response(HttpStatus.NOT_FOUND);
        }

        Budget budget = optionalBudget.get();
        budget.setMonth(updatedBudget.getMonth());
        budget.setYear(updatedBudget.getYear());
        budget.setAmount(updatedBudget.getAmount());
        budget.setCategory(updatedBudget.getCategory());

        budgetRepository.save(budget);

        return new Response(HttpStatus.OK, budget);
    }

    /**
     * Create a new budget item
     * @param budget
     * @return
     */
    @PostMapping
    public Response saveBudgetItem(@RequestBody Budget budget) {
        String user = userService.getUsername();

        /* if the category is not present, create it */
        Optional<Category> optionalCategory = categoryRepository.findOneByCategory(budget.getCategory());

        if (!optionalCategory.isPresent()) {
            Category category = new Category();
            category.setCategory(budget.getCategory());
            category.setUsername(user);
            categoryRepository.save(category);
            logger.info("Category not found. Created category \""
                + category.getCategory()
                + "\" for user \"" + user + "\"");
        }

        /* save the budget item */
        budget.setUsername(user);
        if (budget.getAmount() == null) {
            budget.setAmount(0.0);
        }

        budgetRepository.save(budget);

        return new Response(HttpStatus.CREATED, budget);
    }

    /**
     * Get an existing budget item by ID
     * @param id
     * @return
     */
    @GetMapping(value = "/{id}")
    public Response getbudgetItem(@PathVariable Long id) {
        Optional<Budget> optionalBudget = budgetRepository.findById(id);
        if (!optionalBudget.isPresent()) {
            return new Response(HttpStatus.NOT_FOUND);
        }
        return new Response(HttpStatus.OK, optionalBudget.get());
    }

    /**
     * Delete an existing budget item by ID
     * @param id
     * @return
     */
    @DeleteMapping(value = "/{id}")
    public Response deleteBudgetItem(@PathVariable Long id) {
        Optional<Budget> optionalBudget = budgetRepository.findById(id);
        if (!optionalBudget.isPresent()) {
            return new Response(HttpStatus.NOT_FOUND);
        }

        Budget budget = optionalBudget.get();
        budgetRepository.delete(budget);

        return new Response(HttpStatus.OK);
    }


}
