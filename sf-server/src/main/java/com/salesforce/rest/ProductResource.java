
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
import com.salesforce.model.Product;
import com.salesforce.privileges.Privilege;
import com.salesforce.repository.ProductRepository;
import com.salesforce.security.Secured;

/**
 * @author Arnab Kr Ghosh
 *
 */

@Path("v1/product")
public class ProductResource {

    private static final Logger logger = LogManager.getLogger(ProductResource.class);

    @Autowired
    private ProductRepository productRepository;

    /*@GET
    @Path("/")
    @Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
    @Secured(Privilege.DEFAULT)
    public Response getAllProducts() {
        List<Product> products;
        try {
            products = productRepository.getAllProducts();
            if (products.isEmpty()) {
                logger.error("No product is found.");
                return Response.status(Response.Status.NOT_FOUND).entity(new Message("No product is found.")).build();
            }
            else
                return Response.status(Response.Status.OK).entity(products).build();
        } catch (Exception e) {
            logger.error("The products could not be retrieved", e);
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(new Message(e.getMessage())).build();
        }
    }*/
    
    @GET
    @Path("/")
    @Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
    @Secured(Privilege.DEFAULT)
    public Response getProductPage(@QueryParam("searchString") String searchString, @QueryParam("startPosition") long startPosition) {
        List<Product> products;
        try {
            products = productRepository.getProductPage(searchString, startPosition);
            if (products.size() == 0) {
                logger.error("No product found for searchString: {} and startPosition: {}", () -> searchString, () -> startPosition);
                return Response.status(Response.Status.NOT_FOUND).entity(new Message("No product found")).build();
            }
            return Response.status(Response.Status.OK).entity(products).build();
        } catch (Exception e) {
            logger.error("The products could not be searched", e);
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(new Message(e.getMessage())).build();
        }
    }
}
