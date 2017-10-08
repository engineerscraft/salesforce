package com.salesforce.rest;

import java.util.List;

import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;

import com.salesforce.model.Comment;
import com.salesforce.model.Message;
import com.salesforce.privileges.Privilege;
import com.salesforce.repository.CommentRepository;
import com.salesforce.security.Secured;

@Path("v1/comment")
public class CommentResource {
    private static final Logger logger = LogManager.getLogger(CommentResource.class);

    @Autowired
    private CommentRepository commentRepository;

    @Context
    private SecurityContext securityContext;

    @GET
    @Path("/")
    @Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
    @Secured(Privilege.DEFAULT)
    public Response getCommentPage(@QueryParam("pubKey") String pubKey, @QueryParam("startPosition") long startPosition) {
        List<Comment> comments;
        try {
            comments = commentRepository.getCommentPage(pubKey, startPosition);
            if (comments.size() == 0) {
                logger.error("No comment found for pubKey: {} and startPosition: {}", () -> pubKey, () -> startPosition);
                return Response.status(Response.Status.NOT_FOUND).entity(new Message("No comment found")).build();
            }
            return Response.status(Response.Status.OK).entity(comments).build();
        } catch (Exception e) {
            logger.error("The comments could not be searched", e);
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(new Message(e.getMessage())).build();
        }
    }

    @POST
    @Path("/")
    @Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
    @Secured(Privilege.DEFAULT)
    public Response createComment(Comment comment) {
        try {
            String username = securityContext.getUserPrincipal().getName();
            commentRepository.createComment(comment, username);
            return Response.status(Response.Status.NO_CONTENT).build();
        } catch (Exception e) {
            logger.error(e.getMessage(), e);
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(new Message(e.getMessage())).build();
        }
    }
}
