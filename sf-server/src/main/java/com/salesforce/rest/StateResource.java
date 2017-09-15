package com.salesforce.rest;

import java.util.List;

import javax.validation.constraints.Min;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.salesforce.model.Message;
import com.salesforce.model.State;
import com.salesforce.privileges.Privilege;
import com.salesforce.repository.StateRepository;
import com.salesforce.security.Secured;

/**
 * @author Arnab Kr Ghosh
 *
 */

@Component
@Path("v1/state")
public class StateResource {

    private static final Logger logger = LogManager.getLogger(StateResource.class);

    @Autowired
    private StateRepository stateRepository;

    @GET
    @Path("/")
    @Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
    @Secured(Privilege.DEFAULT)
    public Response getState(@QueryParam("countryId") @Min(1) int countryId) throws Exception {
        List<State> states;
        try {
            states = stateRepository.getStateByCountryId(countryId);

            /* If countryId doesn't return any values */
            if (states.isEmpty()) {
                logger.error("No state is found for countryId: {}", () -> countryId);
                return Response.status(Response.Status.NOT_FOUND).entity(new Message("No state found for the given country.")).build();
            }

            /* If countryId return associated values */
            else
                return Response.status(Response.Status.OK).entity(states).build();
        }

        /* Any other kind of exception */
        catch (Exception ex) {
            logger.error("The states could not be retrieved", ex);
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(new Message(ex.getMessage())).build();
        }

    }

}
