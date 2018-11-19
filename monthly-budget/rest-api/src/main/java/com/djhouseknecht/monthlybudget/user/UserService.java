package com.djhouseknecht.monthlybudget.user;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

/**
 * Service to interact with the logged in user
 */
@Service
public class UserService {

    /**
     * Get the authenticated user's Prinicpal
     * @return
     */
    public Object getAuthenticatedUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authentication.getPrincipal();
    }
    /**
     * Get the authenticated user's username
     * @return String username
     */
    public String getUsername() {
        return SecurityContextHolder.getContext().getAuthentication().getName();
    }
}
