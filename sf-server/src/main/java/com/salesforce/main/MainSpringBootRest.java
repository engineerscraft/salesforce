package com.salesforce.main;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Import;

import com.salesforce.javaconfig.RestConfig;

@SpringBootApplication
@ComponentScan({ "com.salesforce" })
@Import({ RestConfig.class })
public class MainSpringBootRest {
    
    public static void main(String[] args) {
        SpringApplication.run(MainSpringBootRest.class, args);
    }
}