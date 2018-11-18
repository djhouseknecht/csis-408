package com.djhouseknecht.monthlybudget.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * Class to configure basic http authentication, store user(s) in memory,
 *  enable CORS, allow http OPTIONS request, and initialize a password encoder.
 */
@Configuration
@EnableWebSecurity
public class BasicSecurityConfig extends WebSecurityConfigurerAdapter implements WebMvcConfigurer {

    private final static String REALM = "localhost";

    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
        auth
            .inMemoryAuthentication()
                .withUser("Professor")
                .password(passwordEncoder().encode("password"))
                .authorities("ROLE_ADMIN")
            .and()
                .withUser("David")
                .password((passwordEncoder().encode("password")))
                .authorities("ROLE_ADMIN");
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
            .httpBasic().realmName(REALM)
            .and()
                .authorizeRequests()
                .antMatchers("/custom-logout").permitAll()
            .and()
                .authorizeRequests()
                .anyRequest().authenticated();

        http.csrf().disable();
        http.headers().frameOptions().sameOrigin();
        http.headers().frameOptions().disable();
    }


    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
            .allowedOrigins("http://localhost:4200", "https://localhost:4200")
                .allowedMethods("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS", "HEAD")
                .allowedHeaders("content-type", "accept", "X-Requested-With", "remember-me",
                        "withCredentials", "credentials", "Authorization", "Access-Control-Allow-Origin")
                .exposedHeaders("location")
                .allowCredentials(true);
    }

    /* To allow Pre-flight [OPTIONS] request from browser */
    @Override
    public void configure(WebSecurity web) throws Exception {
        web.ignoring().antMatchers(HttpMethod.OPTIONS, "/**");
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}

