package com.hamdard.hua.javaconfig;

import javax.ws.rs.ApplicationPath;

import org.glassfish.jersey.media.multipart.MultiPartFeature;
import org.glassfish.jersey.server.ResourceConfig;

import com.hamdard.hua.filter.AuthenticationFilter;
import com.hamdard.hua.filter.AuthorizationFilter;
import com.hamdard.hua.rest.AuthenticationEndpoint;
import com.hamdard.hua.rest.ChangePasswordEndpoint;
import com.hamdard.hua.rest.HealthCheckEndpoint;
import com.hamdard.hua.rest.PermissionEndpoint;
import com.hamdard.hua.rest.UserManagementEndpoint;

@ApplicationPath("/resources")
public class RestConfig extends ResourceConfig {
    public RestConfig() {
        registerClasses(
                AuthenticationEndpoint.class, 
                AuthenticationFilter.class, 
                AuthorizationFilter.class, 
                HealthCheckEndpoint.class, 
                PermissionEndpoint.class, 
                UserManagementEndpoint.class,
                ChangePasswordEndpoint.class, 
                MultiPartFeature.class);
    }
}