
package com.salesforce.hua.test;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

import java.io.IOException;
import java.util.List;

import org.apache.http.HttpResponse;
import org.apache.http.HttpStatus;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.ContentType;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.HttpClientBuilder;
import org.junit.Test;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.salesforce.model.LoginDetails;
import com.salesforce.model.Token;

public class UnitIT {
	
	
    public static final String AUTH_URL = "http://localhost:8081/resources/v1/authentication";
    
    public static final String SERVICE_URL = "http://localhost:8081/resources/v1/unit";
    
    @Test
    public void givenValidOrganizationId_whenUnitInfoIsRetrieved_thenResponseCodeSuccess() throws IOException{
    	final HttpPost authRequest = new HttpPost(AUTH_URL);
        authRequest.setHeader("Accept", "application/json");
        LoginDetails loginDetails = new LoginDetails("TEST", "TEST");
        ObjectMapper mapper = new ObjectMapper();
        String loginDetailsJson = mapper.writeValueAsString(loginDetails);
        StringEntity input = new StringEntity(loginDetailsJson);
        input.setContentType("application/json");
        authRequest.setEntity(input);
        final HttpResponse httpResponse = HttpClientBuilder.create().build().execute(authRequest);
        assertEquals(httpResponse.getStatusLine().getStatusCode(), HttpStatus.SC_OK);
        
        Token accessToken = mapper.readValue(httpResponse.getEntity().getContent(), Token.class);
       
        final HttpGet getUnitOfAnOrganization = new HttpGet(SERVICE_URL+"?organizationId=1");
        getUnitOfAnOrganization.setHeader("Accept", "application/json");
        getUnitOfAnOrganization.setHeader("Authorization", "Bearer " + accessToken.getAccessToken());
        final HttpResponse getResponse = HttpClientBuilder.create().build().execute(getUnitOfAnOrganization);
        
        assertEquals(getResponse.getStatusLine().getStatusCode(), HttpStatus.SC_OK);
 
        
    }
    
    @Test
    public void givenInvalidOrganizationId_whenUnitInfoIsRetrieved_then404IsReceived() throws IOException{
    	final HttpPost authRequest = new HttpPost(AUTH_URL);
        authRequest.setHeader("Accept", "application/json");
        LoginDetails loginDetails = new LoginDetails("TEST", "TEST");
        ObjectMapper mapper = new ObjectMapper();
        String loginDetailsJson = mapper.writeValueAsString(loginDetails);
        StringEntity input = new StringEntity(loginDetailsJson);
        input.setContentType("application/json");
        authRequest.setEntity(input);
        final HttpResponse httpResponse = HttpClientBuilder.create().build().execute(authRequest);
        assertEquals(httpResponse.getStatusLine().getStatusCode(), HttpStatus.SC_OK);
        
        Token accessToken = mapper.readValue(httpResponse.getEntity().getContent(), Token.class);
       
        final HttpGet getUnitOfAnOrganization = new HttpGet(SERVICE_URL+"?organizationId=99999");
        getUnitOfAnOrganization.setHeader("Accept", "application/json");
        getUnitOfAnOrganization.setHeader("Authorization", "Bearer " + accessToken.getAccessToken());
        final HttpResponse getResponse = HttpClientBuilder.create().build().execute(getUnitOfAnOrganization);
        
        assertEquals(getResponse.getStatusLine().getStatusCode(), HttpStatus.SC_NOT_FOUND);
 
        
    }
    
    @Test
    public void givenRequestWithNoAcceptHeader_whenRequestIsExecuted_thenDefaultResponseContentTypeIsJson() throws IOException{
    	final HttpPost authRequest = new HttpPost(AUTH_URL);
        authRequest.setHeader("Accept", "application/json");
        LoginDetails loginDetails = new LoginDetails("TEST", "TEST");
        ObjectMapper mapper = new ObjectMapper();
        String loginDetailsJson = mapper.writeValueAsString(loginDetails);
        StringEntity input = new StringEntity(loginDetailsJson);
        input.setContentType("application/json");
        authRequest.setEntity(input);
        final HttpResponse httpResponse = HttpClientBuilder.create().build().execute(authRequest);
        assertEquals(httpResponse.getStatusLine().getStatusCode(), HttpStatus.SC_OK);
        
        Token accessToken = mapper.readValue(httpResponse.getEntity().getContent(), Token.class);
       
        final HttpGet getUnitOfAnOrganization = new HttpGet(SERVICE_URL+"?organizationId=1");
        //getUnitOfAnOrganization.setHeader("Accept", "application/json");
        String jsonMimeType = "application/json";
        getUnitOfAnOrganization.setHeader("Authorization", "Bearer " + accessToken.getAccessToken());
        final HttpResponse getResponse = HttpClientBuilder.create().build().execute(getUnitOfAnOrganization);
        String mimeType = ContentType.getOrDefault(getResponse.getEntity()).getMimeType();
        assertEquals(jsonMimeType, mimeType);
 
        
    }
    
    @Test
    public void givenValidOrganizationId_whenUnitInfoIsRetrieved_thenRetrievedResourceIsCorrect() throws IOException{
    	final HttpPost authRequest = new HttpPost(AUTH_URL);
        authRequest.setHeader("Accept", "application/json");
        LoginDetails loginDetails = new LoginDetails("TEST", "TEST");
        ObjectMapper mapper = new ObjectMapper();
        String loginDetailsJson = mapper.writeValueAsString(loginDetails);
        StringEntity input = new StringEntity(loginDetailsJson);
        input.setContentType("application/json");
        authRequest.setEntity(input);
        final HttpResponse httpResponse = HttpClientBuilder.create().build().execute(authRequest);
        assertEquals(httpResponse.getStatusLine().getStatusCode(), HttpStatus.SC_OK);
        
        Token accessToken = mapper.readValue(httpResponse.getEntity().getContent(), Token.class);
       
        final HttpGet getUnitOfAnOrganization = new HttpGet(SERVICE_URL+"?organizationId=1");
        getUnitOfAnOrganization.setHeader("Accept", "application/json");
        getUnitOfAnOrganization.setHeader("Authorization", "Bearer " + accessToken.getAccessToken());
        final HttpResponse getResponse = HttpClientBuilder.create().build().execute(getUnitOfAnOrganization);
       
 
    }
}
