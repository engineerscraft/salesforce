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

import com.salesforce.model.Contact;
import com.salesforce.model.ContactSummary;
import com.salesforce.model.Message;
import com.salesforce.model.PublicKey;
import com.salesforce.privileges.Privilege;
import com.salesforce.repository.ContactRepository;
import com.salesforce.security.Secured;

@Path("v1/contact")
public class ContactResource {

    private static final Logger logger = LogManager.getLogger(ContactResource.class);

    @Autowired
    private ContactRepository contactRepository;

    @Context
    private SecurityContext securityContext;

    @GET
    @Path("/")
    @Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
    @Secured(Privilege.DEFAULT)
    public Response getContactPage(@QueryParam("searchString") String searchString, @QueryParam("startPosition") long startPosition) {
        List<ContactSummary> contacts;
        try {
            contacts = contactRepository.getContactPage(searchString, startPosition);
            if (contacts.size() == 0) {
                logger.error("No contact found for searchString: {} and startPosition: {}", () -> searchString, () -> startPosition);
                return Response.status(Response.Status.NOT_FOUND).entity(new Message("No contact found")).build();
            }
            return Response.status(Response.Status.OK).entity(contacts).build();
        } catch (Exception e) {
            logger.error("The contacts could not be searched", e);
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(new Message(e.getMessage())).build();
        }
    }

    @POST
    @Path("/")
    @Secured(Privilege.DEFAULT)
    @Consumes({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
    @Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
    public Response createContact(Contact contact) {
        try {
            String username = securityContext.getUserPrincipal().getName();
            PublicKey pubKey = contactRepository.createContact(contact, username);
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
    public Response getContact(@PathParam("pubKey") String pubKey) {
        try {
            Contact contact = contactRepository.getContact(pubKey);
            return Response.status(Response.Status.OK).entity(contact).build();
        } catch (EmptyResultDataAccessException e) {
            logger.error("No contact found", e);
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
    public Response updateContact(@PathParam("pubKey") String pubKey, Contact contact) {
        try {
            String username = securityContext.getUserPrincipal().getName();
            PublicKey pubKeyObj = contactRepository.updateContact(pubKey, contact, username);
            return Response.status(Response.Status.OK).entity(pubKeyObj).build();
        } catch (EmptyResultDataAccessException e) {
            logger.error("No contact found", e);
            return Response.status(Response.Status.NOT_FOUND).entity(new Message(e.getMessage())).build();            
        } catch (Exception e) {
            logger.error(e.getMessage(), e);
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(new Message(e.getMessage())).build();
        }
    }
}
