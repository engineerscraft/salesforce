package com.salesforce.main;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Import;

import com.salesforce.javaconfig.RestConfig;

@SpringBootApplication(scanBasePackages={"com.salesforce.javaconfig", "com.salesforce.repository"})
@Import({ RestConfig.class })
public class MainSpringBootRest {
    
    public static void main(String[] args) {
        SpringApplication.run(MainSpringBootRest.class, args);
    }
}