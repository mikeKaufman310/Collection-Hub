package com.collectionHub.collectionHub.controllers;


import java.util.ArrayList;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.collectionHub.collectionHub.types.Collection;

@RestController
public class CollectionController{
    ArrayList<Collection> collectionsList;

    @GetMapping("/allCollections")
    public ArrayList<Collection> allCollections(){
        //jdbc query to get all collections and their info if collectionsList is null
        //if collectionsList is not null, just return its contents
        return collectionsList;
    }
}