package com.collectionHub.collectionHub.controllers;


import java.util.ArrayList;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RestController;

import com.collectionHub.collectionHub.types.Collection;
import com.collectionHub.collectionHub.types.CollectionItem;

@RestController
public class CollectionController{
    ArrayList<Collection> collectionsList;

    @CrossOrigin(origins = "http://localhost:4567")
    @GetMapping("/allCollections")
    public ArrayList<Collection> allCollections(){
        //jdbc query to get all collections and their info if collectionsList is null
        //if collectionsList is not null, just return its contents
        if(collectionsList == null){//where jdbc query will be made
            collectionsList = new ArrayList<>();
            return collectionsList;
        }
        System.out.println("Sending frontend all stored collections");
        return collectionsList;
    }

    @CrossOrigin(origins = "http://localhost:4567")
    @GetMapping("/getCollection/{collectionName}")
    public Collection getCollection(@PathVariable("collectionName") String collectionName){
        for(Collection i : collectionsList){
            if(i.name == collectionName){
                System.out.println("Sending frontend collection: " + i.name);
                return i;
            }
        }
        System.out.println("Sending frontend error, could not find stored collection called " + collectionName);
        return null;
    }

    @CrossOrigin(origins = "http://localhost:4567")
    @GetMapping("/deleteCollection/{collectionName}")
    public Collection deleteCollection(@PathVariable("collectionName") String collectionName){
        for(Collection i : collectionsList){
            if(i.name == collectionName){
                collectionsList.remove(i);
                System.out.println("Removing " + collectionName + " from stored collections");
                return i;
            }
        }
        System.out.println("Sending frontend error, could not find stored collection called " + collectionName);
        return null;
    }

    @CrossOrigin(origins = "http://localhost:4567")
    @PostMapping("/allCollections")
    public Collection addCollection(@RequestBody String collectionName){
        Collection newCollection = new Collection(collectionName);
        collectionsList.add(newCollection);
        System.out.println("Added " + newCollection.name + " to stored collections");
        return newCollection;
    }

    @CrossOrigin(origins = "http://localhost:4567")
    @PostMapping("/addItemToCollection/{collectionName}")
    public CollectionItem addItemToCollection(@RequestBody CollectionItem newItem, @PathVariable("collectionName") String collectionName){
        for(Collection i: collectionsList){
            if(i.name == collectionName){
                i.collectionList.add(newItem);
                System.out.println("Added " + newItem.name() + " to " + i.name);
                return newItem;
            }
        }
        System.out.println("Sending frontend error, could not find stored collection called " + collectionName);
        return null;
    }

    @CrossOrigin(origins = "http://localhost:4567")
    @PostMapping("/removeItemFromCollection/{collectionName}")
    public CollectionItem removeItem(@RequestBody CollectionItem item, @PathVariable("collectionName") String collectionName){
        for(Collection i : collectionsList){
            if(i.name == collectionName && i.collectionList.contains(item)){
                i.collectionList.remove(item);
                System.out.println("Removed " + item.name() + " from collection " + collectionName);
                return item;
            }
        }
        System.out.println("Sending frontend error, could not find stored collection called " + collectionName + " or could not find item called " + item.name());
        return null;
    }
}