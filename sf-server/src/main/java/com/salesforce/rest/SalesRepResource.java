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
import com.salesforce.model.PublicKey;
import com.salesforce.model.SalesRep;
import com.salesforce.model.SalesRepSummary;
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

    @GET
    @Path("/")
    @Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
    @Secured(Privilege.DEFAULT)
    public Response getSalesRepPage(@QueryParam("searchString") String searchString, @QueryParam("startPosition") long startPosition) {
        List<SalesRepSummary> salesReps;
        try {
            salesReps = salesRepRepository.getSalesRepPage(searchString, startPosition);
            if (salesReps.size() == 0) {
                logger.error("No sales representative found for searchString: {} and startPosition: {}", () -> searchString, () -> startPosition);
                return Response.status(Response.Status.NOT_FOUND).entity(new Message("No sales representative found")).build();
            }
            return Response.status(Response.Status.OK).entity(salesReps).build();
        } catch (Exception e) {
            logger.error("The sales representative could not be searched", e);
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(new Message(e.getMessage())).build();
        }
    }

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
            PublicKey pubKey = salesRepRepository.createSalesRep(salesRep, username);
            return Response.status(Response.Status.OK).entity(pubKey).build();
        } catch (Exception e) {
            logger.error(e.getMessage(), e);
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(new Message(e.getMessage())).build();
        }
    }

    @GET
    @Path("{pubKey}")
    @Secured(Privilege.DEFAULT)
    @Consumes({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
    @Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
    public Response getSalesRep(@PathParam("pubKey") String pubKey) {
        try {
            SalesRep salesRep = salesRepRepository.getSalesRep(pubKey);
            return Response.status(Response.Status.OK).entity(salesRep).build();
        } catch (EmptyResultDataAccessException e) {
            logger.error("No sales representative found", e);
            return Response.status(Response.Status.NOT_FOUND).entity(new Message(e.getMessage())).build();
        } catch (Exception e) {
            logger.error(e.getMessage(), e);
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(new Message(e.getMessage())).build();
        }
    }

    @PUT
    @Path("{pubKey}")
    @Secured(Privilege.DEFAULT)
    @Consumes({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
    @Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
    public Response updateSalesRep(@PathParam("pubKey") String pubKey, SalesRep salesRep) {
        try {
            String username = securityContext.getUserPrincipal().getName();
            PublicKey pubKeyObj = salesRepRepository.updateSalesRep(pubKey, salesRep, username);
            return Response.status(Response.Status.OK).entity(pubKeyObj).build();
        } catch (EmptyResultDataAccessException e) {
            logger.error("No sales representative found", e);
            return Response.status(Response.Status.NOT_FOUND).entity(new Message(e.getMessage())).build();
        } catch (Exception e) {
            logger.error(e.getMessage(), e);
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(new Message(e.getMessage())).build();
        }
    }
}
