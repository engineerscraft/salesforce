package com.salesforce.reqmap;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.HandlerMapping;

@Controller
public class Routing {

    @RequestMapping({"/resources/**"}) 
    public String api(final HttpServletRequest request){
        String path = (String) request.getAttribute(
                HandlerMapping.PATH_WITHIN_HANDLER_MAPPING_ATTRIBUTE);
        return path;
    }
    
    @RequestMapping({ "", "/home", "/contactCreation", "/contacts", "/contactDetails/**", "/leadCreation", "/leads", "/leadDetails/**", "/oppCreation", "/opps", "/oppDetails/**", "/salesrepCreation", "/salesreps", "/salesrepDetails/**", "/accounts", "/accountDetails/**" })
    public String gui() {
        return "forward:/index.html";
    }
}