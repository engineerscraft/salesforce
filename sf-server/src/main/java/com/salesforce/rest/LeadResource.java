package com.salesforce.rest;

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

import com.salesforce.model.Lead;
import com.salesforce.model.Message;
import com.salesforce.model.PublicKey;
import com.salesforce.privileges.Privilege;
import com.salesforce.repository.LeadRepository;
import com.salesforce.security.Secured;

@Path("v1/lead")
public class LeadResource {

    private static final Logger logger = LogManager.getLogger(LeadResource.class);

    @Autowired
    private LeadRepository leadRepository;

    @Context
    private SecurityContext securityContext;

    @POST
    @Path("/")
    @Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
    @Secured(Privilege.DEFAULT)
    public Response createLead(Lead lead) {
        try {
            String username = securityContext.getUserPrincipal().getName();
            PublicKey pubKey = leadRepository.createLead(lead, username);
            return Response.status(Response.Status.OK).entity(pubKey).build();
        } catch (Exception e) {
            logger.error("The lead could not be created", e);
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(new Message(e.getMessage())).build();
        }

    }
}
