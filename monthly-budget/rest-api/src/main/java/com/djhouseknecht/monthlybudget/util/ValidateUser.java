package com.djhouseknecht.monthlybudget.util;

import org.springframework.security.core.context.SecurityContextHolder;

public class ValidateUser {

    /**
     * Loop through passed in objects to see if the authenticated user owns the object
     * @param objects
     * @return
     */
    public static Boolean checkUser(HasUsername... objects) {
        String user = SecurityContextHolder.getContext().getAuthentication().getName();
        Boolean response = Boolean.TRUE;

        for (HasUsername o : objects) {
            System.out.println("User on object: " + o.getUsername());
            System.out.println("User from security: " + user);
            System.out.println("result = " + o.getUsername().contentEquals(user));
            if (!o.getUsername().contentEquals(user)) {
                response = Boolean.FALSE;
                break;
            }
        }
        return response;
    }
}
