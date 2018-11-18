package com.djhouseknecht.monthlybudget.user;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    public String getUsername() {
        return SecurityContextHolder.getContext().getAuthentication().getName();
    }
}
