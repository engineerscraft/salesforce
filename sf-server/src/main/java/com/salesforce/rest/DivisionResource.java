package com.salesforce.rest;

import java.util.List;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;

import com.salesforce.model.Division;
import com.salesforce.model.Message;
import com.salesforce.privileges.Privilege;
import com.salesforce.repository.AuthenticationRepository;
import com.salesforce.security.Secured;

@Path("v1/division")
public class DivisionResource {

    private static final Logger logger = LogManager.getLogger(DivisionResource.class);

    @Context
    private SecurityContext securityContext;

    @Autowired
    private AuthenticationRepository authenticationRepository;

    @GET
    @Path("/")
    @Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
    @Secured(Privilege.DEFAULT)
    public Response getDivisionByRole() {
        List<Division> divisions;
        try {
            String username = securityContext.getUserPrincipal().getName();
            divisions = authenticationRepository.getDivisionByRole(username);
            if (divisions.isEmpty()) {
                logger.error("No division is found.");
                return Response.status(Response.Status.NOT_FOUND).entity(new Message("No division is found.")).build();
            }
            /* If data presents in DB */
            else
                return Response.status(Response.Status.OK).entity(divisions).build();
        } catch (Exception e) {
            logger.error("The divisions could not be retrieved", e);
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(new Message(e.getMessage())).build();
        }
    }
}
