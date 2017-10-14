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

import com.salesforce.model.Message;
import com.salesforce.model.Opportunity;
import com.salesforce.model.OpportunitySummary;
import com.salesforce.model.PublicKey;
import com.salesforce.privileges.Privilege;
import com.salesforce.repository.OpportunityRepository;
import com.salesforce.security.Secured;

@Path("v1/opp")
public class OpportunityResource {

    private static final Logger logger = LogManager.getLogger(OpportunityResource.class);

    @Autowired
    private OpportunityRepository oppRepository;

    @Context
    private SecurityContext securityContext;

    @POST
    @Path("/")
    @Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
    @Secured(Privilege.DEFAULT)
    public Response createOpportunity(PublicKey pubKey) {
        try {
            String username = securityContext.getUserPrincipal().getName();
            PublicKey oppPubKey = oppRepository.createOpportunity(pubKey, username);
            return Response.status(Response.Status.OK).entity(oppPubKey).build();
        } catch (Exception e) {
            logger.error("The opportunity could not be created", e);
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(new Message(e.getMessage())).build();
        }

    }
    
    @PUT
    @Path("{pubKey}")
    @Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
    @Secured(Privilege.DEFAULT)
    public Response modifyOpportunity(@PathParam("pubKey") String pubKey, Opportunity opportunity) {
        try {
            String username = securityContext.getUserPrincipal().getName();
            PublicKey pubKeyObj = oppRepository.modifyOpportunity(opportunity, username);
            return Response.status(Response.Status.OK).entity(pubKeyObj).build();
        } catch (Exception e) {
            logger.error("The opportunity could not be modified", e);
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(new Message(e.getMessage())).build();
        }

    }

    @GET
    @Path("{pubKey}")
    @Secured(Privilege.DEFAULT)
    @Consumes({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
    @Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
    public Response getOpportunity(@PathParam("pubKey") String pubKey) {
        try {
            Opportunity opportunity = oppRepository.getOpportunity(pubKey);
            return Response.status(Response.Status.OK).entity(opportunity).build();
        } catch (EmptyResultDataAccessException e) {
            logger.error("No opportunity found", e);
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
    public Response getOpportunityPage(@QueryParam("searchString") String searchString, @QueryParam("startPosition") long startPosition) {
        List<OpportunitySummary> opportunities;
        try {
            opportunities = oppRepository.getOpportunityPage(searchString, startPosition);
            if (opportunities.size() == 0) {
                logger.error("No opportunity found for searchString: {} and startPosition: {}", () -> searchString, () -> startPosition);
                return Response.status(Response.Status.NOT_FOUND).entity(new Message("No contact found")).build();
            }
            return Response.status(Response.Status.OK).entity(opportunities).build();
        } catch (Exception e) {
            logger.error("The opportunities could not be searched", e);
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(new Message(e.getMessage())).build();
        }
    }
}
