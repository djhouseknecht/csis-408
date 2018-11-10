package com.djhouseknecht.monthlybudget.test;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

    @RequestMapping(value = "/test", method = RequestMethod.GET)
    public String[] test() {
        String[] array = { "hi", "bye"};
        return array;
    }
}
