package com.djhouseknecht.monthlybudget.budget.category;

import com.djhouseknecht.monthlybudget.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value = "/category")
public class CategoryController {

    @Autowired
    private UserService userService;

    @Autowired
    private CategoryRepository categoryRepository;

    @GetMapping
    public ResponseEntity<Object> getAllUsersCategories() {
        List<Category> categories = categoryRepository.findAllByUsername(userService.getUsername());
        return new ResponseEntity(categories, HttpStatus.OK);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<Object> getCategory(@PathVariable Long id) {
        Optional<Category> category = categoryRepository.findById(id);
        if (!category.isPresent()) {
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity(category.get(), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Object> createCategory(@RequestBody Category category) {
        category.setUsername(userService.getUsername());
        categoryRepository.save(category);
        return new ResponseEntity(category, HttpStatus.CREATED);
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<Object> updateCategory(@PathVariable Long id, @RequestBody Category updatedCategory) {
        Optional<Category> optionalCategory = categoryRepository.findById(id);

        if (!optionalCategory.isPresent()) {
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }

        Category category = optionalCategory.get();
        category.setCategory(updatedCategory.getCategory());
        categoryRepository.save(category);

        return new ResponseEntity(category, HttpStatus.OK);
    }

}
