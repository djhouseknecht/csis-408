package com.djhouseknecht.monthlybudget.user;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Controller
public class UserController {

    /**
     * Get the authenticated user
     * @return
     */
    @GetMapping(value = "/hello-user", produces = {"application/json"})
    public ResponseEntity getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return new ResponseEntity(authentication.getPrincipal(), HttpStatus.OK);
    }

    /**
     * Logout the current user
     * @param request
     * @param response
     * @return
     */
    @RequestMapping(value = "/custom-logout", method = RequestMethod.POST)
    public ResponseEntity logout(HttpServletRequest request, HttpServletResponse response) {
        // Get the Spring Authentication object of the current request.
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        // In case you are not filtering the users of this request url.
        if (authentication != null){
            new SecurityContextLogoutHandler().logout(request, response, authentication); // <= This is the call you are looking for.
        }
        return new ResponseEntity(HttpStatus.OK);
    }
}
