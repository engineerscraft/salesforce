package com.salesforce.rest;

import java.util.List;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;

import com.salesforce.model.Message;
import com.salesforce.model.Status;
import com.salesforce.privileges.Privilege;
import com.salesforce.repository.StatusRepository;
import com.salesforce.security.Secured;

/**
 * @author Arnab Kr Ghosh
 *
 */

@Path("v1/status")
public class StatusResource {

    private static final Logger logger = LogManager.getLogger(StatusResource.class);

    @Autowired
    private StatusRepository statusRepository;

    @GET
    @Path("/")
    @Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
    @Secured(Privilege.DEFAULT)
    public Response getStatus(@QueryParam("entity") String entity, @QueryParam("currentStatusPubKey") String statusPubKey) {
        List<Status> status;
        try {
            status = statusRepository.getAllStatusByEntity(entity, statusPubKey);
            if (status.isEmpty()) {
                logger.error("No status found for the given entity.", () -> entity);
                return Response.status(Response.Status.NOT_FOUND).entity(new Message("No status found for the given entity.")).build();
            } else
                return Response.status(Response.Status.OK).entity(status).build();
        } catch (Exception ex) {
            logger.error("The status could not be retrieved", ex);
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(new Message(ex.getMessage())).build();
        }

    }

}
