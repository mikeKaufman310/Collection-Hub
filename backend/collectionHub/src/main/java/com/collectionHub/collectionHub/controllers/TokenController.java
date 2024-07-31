package com.collectionHub.collectionHub.controllers;

import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@RestController
public class TokenController{

    @Autowired
    private RestTemplate restTemplate;

    @GetMapping("/getEbayToken")
    public String getEbayToken(){
        //base64 encode credentials
        //do post to https://api.ebay.com/identity/v1/oauth2/token with headers and query string like...
        /*
         * qs.stringify({
                    grant_type: 'client_credentials',
                    scope: 'https://api.ebay.com/oauth/api_scope'
                }),{
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Authorization': `Basic ${auth}`
                    }
                }
         */
        //return ebay response credential as response value
        String url = "https://api.ebay.com/identity/v1/oauth2/token";//no params
        //https://api.ebay.com/identity/v1/oauth2/token?grant_type=client_credentials&scope=https://api.ebay.com/oauth/api_scope
        return "";
    }
}