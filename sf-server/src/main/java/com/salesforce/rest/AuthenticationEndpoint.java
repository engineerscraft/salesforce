package com.salesforce.rest;

import java.util.List;

import javax.validation.Valid;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ldap.AuthenticationException;
import org.springframework.web.bind.annotation.RequestBody;

import com.salesforce.model.Division;
import com.salesforce.model.LoginDetails;
import com.salesforce.model.Message;
import com.salesforce.model.Token;
import com.salesforce.privileges.Privilege;
import com.salesforce.repository.AuthenticationRepository;
import com.salesforce.security.Secured;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jws;

@Path("/v1/authentication")
public class AuthenticationEndpoint {

    private static final Logger logger = LogManager.getLogger(AuthenticationEndpoint.class);

    @Autowired
    private AuthenticationRepository authenticationRepository;

    @Context
    private SecurityContext securityContext;

    @POST
    @Consumes({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
    @Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
    public Response authenticateUser(@Valid @RequestBody LoginDetails loginDetails) {
        Token token = null;
        try {
            if (loginDetails.getUsername() != null) {
                String userDisplayName = authenticationRepository.authenticate(loginDetails.getUsername(), loginDetails.getPassword());
                token = authenticationRepository.issueToken(loginDetails.getUsername(), userDisplayName, 0L);
            } else if (loginDetails.getToken() != null) {
                Jws<Claims> jws = authenticationRepository.validateToken(loginDetails.getToken());
                token = authenticationRepository.issueToken(jws.getBody().getSubject(), (String) jws.getBody().get("DISPLAY_NAME"), Long.valueOf(jws.getBody().get("TOKEN_ID").toString()));
            } else {
                logger.error("Username/Password or token is mandatory");
                return Response.status(Response.Status.UNAUTHORIZED).entity(new Message("Username/password or refresh token is mandatory")).build();
            }
            return Response.status(Response.Status.OK).entity(token).build();
        } catch (AuthenticationException e) {
            logger.error("Invalid username and password", e);
            return Response.status(Response.Status.UNAUTHORIZED).entity(new Message("Invalid username and password")).build();
        } catch (ExpiredJwtException e) {
            logger.error("Refresh token expired", e);
            return Response.status(Response.Status.UNAUTHORIZED).entity(new Message("Refresh token expired")).build();
        } catch (Exception e) {
            logger.error(e.getMessage(), e);
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(new Message(e.getMessage())).build();
        }

    }

    @GET
    @Path("/division")
    @Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
    @Secured(Privilege.DEFAULT)
    public Response getDivisionByRole() {
        List<Division> division;
        try {
            String username = securityContext.getUserPrincipal().getName();
            division = authenticationRepository.getDivisionByRole(username);
            if (division.isEmpty()) {
                logger.error("No division is found.");
                return Response.status(Response.Status.NOT_FOUND).entity(new Message("No division is found.")).build();
            }
            /* If data presents in DB */
            else
                return Response.status(Response.Status.OK).entity(division).build();
        } catch (Exception e) {
            logger.error("The divisions could not be retrieved", e);
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(new Message(e.getMessage())).build();
        }
    }

}