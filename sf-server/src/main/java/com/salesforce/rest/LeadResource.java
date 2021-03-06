package com.salesforce.rest;

import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;

import com.salesforce.model.Lead;
import com.salesforce.model.LeadSummary;
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
    
    @PUT
    @Path("{pubKey}")
    @Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
    @Secured(Privilege.DEFAULT)
    public Response modifyLead(@PathParam("pubKey") String pubKey, Lead lead) {
        try {
            String username = securityContext.getUserPrincipal().getName();
            PublicKey pubKeyObj = leadRepository.modifyLead(lead, username);
            return Response.status(Response.Status.OK).entity(pubKeyObj).build();
        } catch (Exception e) {
            logger.error("The lead could not be created", e);
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(new Message(e.getMessage())).build();
        }

    }

    @GET
    @Path("{pubKey}")
    @Secured(Privilege.DEFAULT)
    @Consumes({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
    @Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
    public Response getLead(@PathParam("pubKey") String pubKey) {
        try {
            Lead lead = leadRepository.getLead(pubKey);
            return Response.status(Response.Status.OK).entity(lead).build();
        } catch (EmptyResultDataAccessException e) {
            logger.error("No lead found", e);
            return Response.status(Response.Status.NOT_FOUND).entity(new Message(e.getMessage())).build();            
        } catch (Exception e) {
            logger.error(e.getMessage(), e);
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(new Message(e.getMessage())).build();
        }
    }
    
    @GET
    @Path("/")
    @Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
    @Secured(Privilege.DEFAULT)
    public Response getLeadPage(@QueryParam("searchString") String searchString, @QueryParam("startPosition") long startPosition) {
        List<LeadSummary> leads;
        try {
            leads = leadRepository.getLeadPage(searchString, startPosition);
            if (leads.size() == 0) {
                logger.error("No Lead found for searchString: {} and startPosition: {}", () -> searchString, () -> startPosition);
                return Response.status(Response.Status.NOT_FOUND).entity(new Message("No contact found")).build();
            }
            return Response.status(Response.Status.OK).entity(leads).build();
        } catch (Exception e) {
            logger.error("The leads could not be searched", e);
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(new Message(e.getMessage())).build();
        }
    }
}
