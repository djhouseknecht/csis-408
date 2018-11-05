package com.djhouseknecht.monthlybudget.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;

@EnableWebSecurity
public class SecurityConfig {

//    @Autowired
//    public void configureGlobalSecurity(AuthenticationManagerBuilder auth) throws Exception {
//        auth.inMemoryAuthentication().withUser()
//    }

//    @Autowired
//    InMemoryUserDetailsManager manager;

    @Bean
    public UserDetailsService userDetailsService() {
        InMemoryUserDetailsManager manager = new InMemoryUserDetailsManager();
        manager.createUser(User.withUsername("david").password("{noop}secure").roles("USER").build());
        return manager;
    }

}
