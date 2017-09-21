package com.salesforce.rest;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;

import com.salesforce.model.Message;
import com.salesforce.model.SalesRep;
import com.salesforce.privileges.Privilege;
import com.salesforce.repository.SalesRepRepository;
import com.salesforce.security.Secured;

/**
 * @author Arnab Kr Ghosh
 *
 */
@Path("v1/salesrep")
public class SalesRepResource {

    private static final Logger logger = LogManager.getLogger(SalesRepResource.class);

    @Autowired
    private SalesRepRepository salesRepRepository;

    @Context
    private SecurityContext securityContext;

    /**
     * @param salesRep
     * @return
     */
    @POST
    @Path("/")
    @Secured(Privilege.DEFAULT)
    @Consumes({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
    @Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
    public Response createSalesRep(SalesRep salesRep) {
        try {
            String username = securityContext.getUserPrincipal().getName();
            String message = salesRepRepository.createSalesRep(salesRep, username);
            return Response.status(Response.Status.OK).entity(new Message(message)).build();
        } catch (Exception e) {
            logger.error(e.getMessage(), e);
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(new Message(e.getMessage())).build();
        }
    }
}
