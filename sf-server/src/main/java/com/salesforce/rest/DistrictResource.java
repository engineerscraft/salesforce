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

import com.salesforce.model.District;
import com.salesforce.model.Message;
import com.salesforce.privileges.Privilege;
import com.salesforce.repository.DistrictRepository;
import com.salesforce.security.Secured;

/**
 * @author Arnab Kr Ghosh
 *
 */

@Path("v1/district")
public class DistrictResource {

    private static final Logger logger = LogManager.getLogger(DistrictResource.class);

    @Autowired
    private DistrictRepository districtRepository;

    @GET
    @Path("/")
    @Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
    @Secured(Privilege.DEFAULT)
    public Response getDistrict(@QueryParam("sId") @Min(1) int sId) {
        List<District> districts;
        try {
            districts = districtRepository.getDistrictsByStateId(sId);
            if (districts.isEmpty()) {
                logger.error("No district is found for the given state.: {}", () -> sId);
                return Response.status(Response.Status.NOT_FOUND).entity(new Message("No district is found for the given state.")).build();
            } else
                return Response.status(Response.Status.OK).entity(districts).build();
        } catch (Exception ex) {
            logger.error("The districts could not be retrieved", ex);
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(new Message(ex.getMessage())).build();
        }

    }

}
