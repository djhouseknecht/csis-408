package com.djhouseknecht.monthlybudget.util;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.MultiValueMap;

/**
 * Helper class to return HTTP responses
 */
public class Response extends ResponseEntity<Object> {

    public Response() {
        super(HttpStatus.OK);
    }
    public Response(HttpStatus status) {
        super(status);
    }

    public Response(HttpStatus status, Object body) {
        super(body, status);
    }

    public Response(Object body, HttpStatus status) {
        super(body, status);
    }

    public Response(MultiValueMap<String, String> headers, HttpStatus status) {
        super(headers, status);
    }

    public Response(Object body, MultiValueMap<String, String> headers, HttpStatus status) {
        super(body, headers, status);
    }
}
