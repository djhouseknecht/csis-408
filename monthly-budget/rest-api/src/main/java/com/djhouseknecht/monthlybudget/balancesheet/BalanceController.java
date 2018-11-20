package com.djhouseknecht.monthlybudget.balancesheet;

import com.djhouseknecht.monthlybudget.category.CategoryService;
import com.djhouseknecht.monthlybudget.user.UserService;
import com.djhouseknecht.monthlybudget.util.Response;
import com.djhouseknecht.monthlybudget.util.ValidateUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

/**
 * Controller to handle all HTTP request concerning budget items
 */
@RestController
@RequestMapping(value = "/balance-sheet")
public class BalanceController {

    @Autowired
    private BalanceRepository balanceRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private CategoryService categoryService;

    /**
     * Get balance sheet items. Can pass in year and month, or just year for filtering
     * @param year
     * @param month
     * @return
     */
    @GetMapping
    public Response getBalanceSheetForYearAndMonth(@RequestParam(value = "year", required = false) Integer year,
                @RequestParam(value = "month", required = false) Integer month) {
        List<BalanceSheet> balanceSheets;
        String user = userService.getUsername();

        /* if year and month are present */
        if (year != null && month != null) {
            balanceSheets = balanceRepository.findAllByUsernameAndYearAndMonth(user, year, month);
        } else if (year != null) {
            balanceSheets = balanceRepository.findAllByUsernameAndYear(user, year);
        } else {
            balanceSheets = balanceRepository.findAllByUsername(user);
        }
        return new Response(HttpStatus.OK, balanceSheets);
    }

    /**
     * Get a single balance sheet item given an ID
     * @param id
     * @return
     */
    @GetMapping(value = "/{id}")
    public Response getBalanceSheetById(@PathVariable Long id) {
        Optional<BalanceSheet> optionalBalanceSheet = balanceRepository.findById(id);
        if (!optionalBalanceSheet.isPresent()) {
            return new Response(HttpStatus.NOT_FOUND);
        }

        BalanceSheet balanceSheet = optionalBalanceSheet.get();
        /* validate user */
        if (!ValidateUser.checkUser(balanceSheet)) {
            return new Response(HttpStatus.FORBIDDEN);
        }

        return new Response(HttpStatus.OK, balanceSheet);
    }

    /**
     * Create a new balance sheet item
     * @param balanceSheet
     * @return
     */
    @PostMapping
    public Response createNewBalanceSheet(@RequestBody BalanceSheet balanceSheet) {
        /* create category if it does not exist */
        categoryService.createCategoryIfDoesNotExist(userService.getUsername(), balanceSheet.getCategory());

        if (balanceSheet.getAmount() == null) balanceSheet.setAmount(0.0);
        balanceSheet.setUsername(userService.getUsername());
        balanceSheet = balanceRepository.save(balanceSheet);
        return new Response(HttpStatus.CREATED, balanceSheet);
    }

    /**
     * Update an existing balance sheet item
     * @param id
     * @param updatedBalanceSheet
     * @return
     */
    @PutMapping(value = "/{id}")
    public Response updateBalanceSheet(@PathVariable Long id, @RequestBody BalanceSheet updatedBalanceSheet) {
        Optional<BalanceSheet> optionalBalanceSheet = balanceRepository.findById(id);
        if (!optionalBalanceSheet.isPresent()) {
            return new Response(HttpStatus.NOT_FOUND);
        }

        BalanceSheet balanceSheet = optionalBalanceSheet.get();
        /* validate user */
        if (!ValidateUser.checkUser(balanceSheet)) {
            return new Response(HttpStatus.FORBIDDEN);
        }

        /* create category if it does not exist */
        categoryService.createCategoryIfDoesNotExist(userService.getUsername(), updatedBalanceSheet.getCategory());

        balanceSheet.setDate(updatedBalanceSheet.getDate());
        balanceSheet.setAmount(updatedBalanceSheet.getAmount());
        balanceSheet.setCategory(updatedBalanceSheet.getCategory());
        balanceSheet.setDescription(updatedBalanceSheet.getDescription());
        balanceSheet = balanceRepository.save(balanceSheet);

        return new Response(HttpStatus.OK, balanceSheet);
    }

    /**
     * Delete an existing balance sheet item
     * @param id
     * @return
     */
    @DeleteMapping(value = "/{id}")
    public Response deleteBalanceSheet(@PathVariable Long id) {
        Optional<BalanceSheet> optionalBalanceSheet = balanceRepository.findById(id);
        if (!optionalBalanceSheet.isPresent()) {
            return new Response(HttpStatus.NOT_FOUND);
        }

        BalanceSheet balanceSheet = optionalBalanceSheet.get();
        /* validate user */
        if (!ValidateUser.checkUser(balanceSheet)) {
            return new Response(HttpStatus.FORBIDDEN);
        }
        balanceRepository.delete(balanceSheet);
        return new Response(HttpStatus.OK);
    }
}
