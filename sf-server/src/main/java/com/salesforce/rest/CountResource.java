
package com.salesforce.rest;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;

import com.salesforce.model.Count;
import com.salesforce.model.Message;
import com.salesforce.privileges.Privilege;
import com.salesforce.repository.CountRepository;
import com.salesforce.security.Secured;

/**
 * @author Arnab Kr Ghosh
 *
 */

@Path("v1/count")
public class CountResource {

    private static final Logger logger = LogManager.getLogger(CountResource.class);

    @Autowired
    private CountRepository countRepository;

    @GET
    @Path("/")
    @Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
    @Secured(Privilege.DEFAULT)
    public Response getAllCounts() {
        Count count;
        try {
            count = countRepository.getAllCounts();
            return Response.status(Response.Status.OK).entity(count).build();
        } catch (EmptyResultDataAccessException e) {
            logger.error("No count found", e);
            return Response.status(Response.Status.NOT_FOUND).entity(new Message(e.getMessage())).build();
        } catch (Exception e) {
            logger.error(e.getMessage(), e);
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(new Message(e.getMessage())).build();
        }
    }

}
