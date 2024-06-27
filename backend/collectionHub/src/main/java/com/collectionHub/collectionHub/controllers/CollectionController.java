package com.collectionHub.collectionHub.controllers;


import java.util.ArrayList;
import java.util.Locale;
import java.lang.*;
import java.text.*;
import java.text.SimpleDateFormat;

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
    @PostMapping("/getCollection")
    public Collection getCollection(@RequestBody String collectionName){
        for(Collection i : collectionsList){
            if(i.name.equals(collectionName.substring(1, collectionName.length()-1))){
                System.out.println("Sending frontend collection: " + i.name);
                return i;
            }
        }
        System.out.println("Sending frontend error, could not find stored collection called " + collectionName.substring(1, collectionName.length()-1) + " to display collection");
        return null;
    }

    @CrossOrigin(origins = "http://localhost:4567")
    @DeleteMapping("/allCollections")
    public Collection deleteCollection(@RequestBody String collectionName){
        for(Collection i : collectionsList){
            if(i.name.equals(collectionName.substring(1, collectionName.length()-1))){
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
        Collection newCollection = new Collection(collectionName.substring(1, collectionName.length()-1));
        collectionsList.add(newCollection);
        System.out.println("Added " + newCollection.name + " to stored collections");
        return newCollection;
    }

    @CrossOrigin(origins = "http://localhost:4567")
    @PostMapping("/addToCollections")
    public CollectionItem addItemToCollection(@RequestBody CollectionItem item){
        //System.out.println(collectionName);//for debugging
        for(Collection i: collectionsList){
            if(i.name.equals(item.collectionName()/**.substring(1, item.collectionName().length())**/)){
                try{
                    DateFormat form = new SimpleDateFormat("mm/dd/yy");
                    //CollectionItem newItem = new CollectionItem(item.name(), item.series(), item.number(), form.parse(item.dateReleased()), form.parse(item.dateOfAcquisition()), item.productionRun());
                    i.collectionList.add(item);
                    System.out.println("Added " + item.name() + " to " + i.name);
                    return item;
                }
                catch(Exception e){
                    System.out.println("Uanble to parse date");
                }
            }
        }
        System.out.println("Sending frontend error, could not find stored collection called " + item.collectionName() + " to add item");
        return null;
    }

    @CrossOrigin(origins = "http://localhost:4567")
    @DeleteMapping("/allCollections/{collectionName}")
    public CollectionItem removeItem(@RequestBody CollectionItem item, @PathVariable("collectionName") String collectionName){
        for(Collection i : collectionsList){
            if(i.name.equals(collectionName.substring(1, collectionName.length()-1)) && i.collectionList.contains(item)){
                i.collectionList.remove(item);
                System.out.println("Removed " + item.name() + " from collection " + collectionName);
                return item;
            }
        }
        System.out.println("Sending frontend error, could not find stored collection called " + collectionName + " or could not find item called " + item.name());
        return null;
    }
}