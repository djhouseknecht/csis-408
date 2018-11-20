package com.djhouseknecht.monthlybudget.budget;

import com.djhouseknecht.monthlybudget.category.CategoryRepository;
import com.djhouseknecht.monthlybudget.category.CategoryService;
import com.djhouseknecht.monthlybudget.user.UserService;
import com.djhouseknecht.monthlybudget.util.Response;
import com.djhouseknecht.monthlybudget.util.ValidateUser;
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

    @Autowired
    private CategoryService categoryService;

    /**
     * Get budget items. Can pass in year and month, or just year for filtering
     * @param year
     * @param month
     * @return
     */
    @GetMapping
    public Response getBudgetItems(@RequestParam(value = "year", required = false) Integer year,
                                   @RequestParam(value = "month", required = false) Integer month) {
        List<Budget> budgets;
        String user = userService.getUsername();

        /* if year and month are present */
        if (year != null && month != null) {
            budgets = budgetRepository.findAllByUsernameAndYearAndMonth(userService.getUsername(), year, month);
        } else if (year != null) {
            budgets = budgetRepository.findAllByUsernameAndYear(user, year);
        } else {
            budgets = budgetRepository.findAllByUsername(user);
        }
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

        /* validate user */
        if (!ValidateUser.checkUser(budget)) {
            return new Response(HttpStatus.FORBIDDEN);
        }

        /* create category if it does not exist */
        categoryService.createCategoryIfDoesNotExist(userService.getUsername(), budget.getCategory());

        budget.setMonth(updatedBudget.getMonth());
        budget.setYear(updatedBudget.getYear());
        budget.setAmount(updatedBudget.getAmount());
        budget.setCategory(updatedBudget.getCategory());

        if (updatedBudget.getIncome() == null) budget.setIncome(updatedBudget.getIncome());

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

        /* create category if it does not exist */
        categoryService.createCategoryIfDoesNotExist(userService.getUsername(), budget.getCategory());

        /* save the budget item */
        budget.setUsername(user);
        if (budget.getAmount() == null) {
            budget.setAmount(0.0);
        }

        if (budget.getIncome() == null) {
            budget.setIncome("Y");
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
        Budget budget = optionalBudget.get();
        /* validate user */
        if (!ValidateUser.checkUser(budget)) {
            return new Response(HttpStatus.FORBIDDEN);
        }

        return new Response(HttpStatus.OK, budget);
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
        /* validate user */
        if (!ValidateUser.checkUser(budget)) {
            return new Response(HttpStatus.FORBIDDEN);
        }

        budgetRepository.delete(budget);

        return new Response(HttpStatus.OK);
    }


}
