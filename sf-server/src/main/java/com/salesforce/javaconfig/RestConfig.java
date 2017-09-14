package com.salesforce.javaconfig;

import javax.ws.rs.ApplicationPath;

import org.glassfish.jersey.media.multipart.MultiPartFeature;
import org.glassfish.jersey.server.ResourceConfig;

import com.salesforce.filter.AuthenticationFilter;
import com.salesforce.filter.AuthorizationFilter;
import com.salesforce.rest.AuthenticationEndpoint;
import com.salesforce.rest.ChangePasswordEndpoint;
import com.salesforce.rest.HealthCheckEndpoint;
import com.salesforce.rest.PermissionEndpoint;
import com.salesforce.rest.StatusResource;

@ApplicationPath("/resources")
public class RestConfig extends ResourceConfig {
    public RestConfig() {
        registerClasses(AuthenticationEndpoint.class, AuthenticationFilter.class, AuthorizationFilter.class, HealthCheckEndpoint.class, PermissionEndpoint.class, ChangePasswordEndpoint.class, MultiPartFeature.class, StatusResource.class);
    }
}