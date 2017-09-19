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

import com.salesforce.model.ContactSummary;
import com.salesforce.model.Message;
import com.salesforce.privileges.Privilege;
import com.salesforce.repository.ContactRepository;
import com.salesforce.security.Secured;

@Path("v1/contact")
public class ContactResource {

    private static final Logger logger = LogManager.getLogger(ContactResource.class);

    @Autowired
    private ContactRepository contactRepository;

    @GET
    @Path("/")
    @Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
    @Secured(Privilege.DEFAULT)
    public Response getContactPage(@QueryParam("searchString") String searchString, @QueryParam("startPosition") long startPosition) {
        List<ContactSummary> contacts;
        try {
            contacts = contactRepository.getContactPage(searchString, startPosition);
            if(contacts.size() == 0) {
               logger.error("No contact forund for searchString: {} and startPosition: {}", () -> searchString, () -> startPosition);
               return Response.status(Response.Status.NOT_FOUND).entity(new Message("No contact found")).build();
            }
            return Response.status(Response.Status.OK).entity(contacts).build();
        } catch (Exception e) {
            logger.error("The contacts could not be searched", e);
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(new Message(e.getMessage())).build();
        }
    }
}
