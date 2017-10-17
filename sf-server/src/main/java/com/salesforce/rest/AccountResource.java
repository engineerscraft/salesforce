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

import com.salesforce.model.Account;
import com.salesforce.model.AccountSummary;
import com.salesforce.model.Message;
import com.salesforce.model.PublicKey;
import com.salesforce.privileges.Privilege;
import com.salesforce.repository.AccountRepository;
import com.salesforce.security.Secured;

/**
 * @author Arnab Kr Ghosh
 *
 */

@Path("v1/account")
public class AccountResource {

    private static final Logger logger = LogManager.getLogger(AccountResource.class);

    @Autowired
    private AccountRepository accountRepository;

    @Context
    private SecurityContext securityContext;

    @POST
    @Path("/")
    @Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
    @Secured(Privilege.DEFAULT)
    public Response createAccount(PublicKey pubKey) {
        try {
            String username = securityContext.getUserPrincipal().getName();
            PublicKey oppPubKey = accountRepository.createAccount(pubKey, username);
            return Response.status(Response.Status.OK).entity(oppPubKey).build();
        } catch (Exception e) {
            logger.error("The account could not be created", e);
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(new Message(e.getMessage())).build();
        }

    }

    @GET
    @Path("/")
    @Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
    @Secured(Privilege.DEFAULT)
    public Response getAccountPage(@QueryParam("searchString") String searchString, @QueryParam("startPosition") long startPosition) {
        List<AccountSummary> accounts;
        try {
            accounts = accountRepository.getAccountPage(searchString, startPosition);
            if (accounts.size() == 0) {
                logger.error("No account found for searchString: {} and startPosition: {}", () -> searchString, () -> startPosition);
                return Response.status(Response.Status.NOT_FOUND).entity(new Message("No account found")).build();
            }
            return Response.status(Response.Status.OK).entity(accounts).build();
        } catch (Exception e) {
            logger.error("The accounts could not be searched", e);
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(new Message(e.getMessage())).build();
        }
    }

    @GET
    @Path("/summary/{pubKey}")
    @Secured(Privilege.DEFAULT)
    @Consumes({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
    @Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
    public Response getAccountSummary(@PathParam("pubKey") String pubKey) {
        try {
            AccountSummary account = accountRepository.getAccountSummary(pubKey);
            return Response.status(Response.Status.OK).entity(account).build();
        } catch (EmptyResultDataAccessException e) {
            logger.error("No account found", e);
            return Response.status(Response.Status.NOT_FOUND).entity(new Message(e.getMessage())).build();
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
    public Response getAccount(@PathParam("pubKey") String pubKey) {
        try {
            Account account = accountRepository.getAccount(pubKey);
            return Response.status(Response.Status.OK).entity(account).build();
        } catch (EmptyResultDataAccessException e) {
            logger.error("No account found", e);
            return Response.status(Response.Status.NOT_FOUND).entity(new Message(e.getMessage())).build();
        } catch (Exception e) {
            logger.error(e.getMessage(), e);
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(new Message(e.getMessage())).build();
        }
    }

    @PUT
    @Path("{pubKey}")
    @Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
    @Secured(Privilege.DEFAULT)
    public Response modifyAccount(@PathParam("pubKey") String pubKey, Account account) {
        try {
            String username = securityContext.getUserPrincipal().getName();
            PublicKey pubKeyObj = accountRepository.modifyAccount(account, username);
            return Response.status(Response.Status.OK).entity(pubKeyObj).build();
        } catch (Exception e) {
            logger.error("The account could not be modified", e);
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(new Message(e.getMessage())).build();
        }

    }
}
