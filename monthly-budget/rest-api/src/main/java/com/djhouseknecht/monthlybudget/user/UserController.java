package com.djhouseknecht.monthlybudget.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;
import java.util.Optional;

@Controller
@RequestMapping(value = "/user")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping(value = "/{id}")
    public ResponseEntity<List<User>> getUsers(@RequestParam Long id) {
        Optional<User> user = userRepository.findById(id);
        if (!user.isPresent()) {
            return new ResponseEntity(user, HttpStatus.OK);
        }

        return new ResponseEntity(HttpStatus.NOT_FOUND);
    }

}
