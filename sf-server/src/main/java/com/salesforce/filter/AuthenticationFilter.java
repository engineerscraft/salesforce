package com.salesforce.filter;

import java.io.IOException;
import java.security.Principal;

import javax.annotation.Priority;
import javax.ws.rs.Priorities;
import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerRequestFilter;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;
import javax.ws.rs.ext.Provider;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.salesforce.model.Message;
import com.salesforce.repository.AuthenticationRepository;
import com.salesforce.security.Secured;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jws;

@Secured
@Provider
@Priority(Priorities.AUTHENTICATION)
@Component
public class AuthenticationFilter implements ContainerRequestFilter {
    
    private static final Logger logger = LogManager.getLogger(AuthenticationFilter.class);

    @Autowired
    private AuthenticationRepository authenticationRepository;

    @Override
    public void filter(ContainerRequestContext requestContext) throws IOException {
        // Get the HTTP Authorization header from the request
        String authorizationHeader = requestContext.getHeaderString(HttpHeaders.AUTHORIZATION);

        // Check if the HTTP Authorization header is present and formatted
        // correctly
        if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
            requestContext.abortWith(Response.status(Response.Status.UNAUTHORIZED).entity(new Message("Authorization header must be provided")).build());
            return;
        }
        // Extract the token from the HTTP Authorization header
        String token = authorizationHeader.substring("Bearer".length()).trim();

        // Validate the token
        try {
            Jws<Claims> jws = authenticationRepository.validateToken(token);

            requestContext.setSecurityContext(new SecurityContext() {

                @Override
                public Principal getUserPrincipal() {

                    return new Principal() {

                        @Override
                        public String getName() {
                            return jws.getBody().getSubject();
                        }
                    };
                }

                @Override
                public boolean isUserInRole(String role) {
                    return true;
                }

                @Override
                public boolean isSecure() {
                    return requestContext.getSecurityContext().isSecure();
                }

                @Override
                public String getAuthenticationScheme() {
                    return "JWT";
                }
            });
        } catch (ExpiredJwtException e) {
            logger.error(e.getMessage(), e);
            requestContext.abortWith(Response.status(Response.Status.UNAUTHORIZED).entity(new Message("Token expired")).build());
        } catch (Exception e) {
            logger.error(e.getMessage(), e);
            requestContext.abortWith(Response.status(Response.Status.UNAUTHORIZED).entity(new Message("Token expired")).build());
        }

    }

}