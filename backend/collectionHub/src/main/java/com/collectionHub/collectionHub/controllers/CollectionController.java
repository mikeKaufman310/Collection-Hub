package com.collectionHub.collectionHub.controllers;


import java.util.ArrayList;
import java.util.Locale;
import java.util.Optional;
import java.lang.*;
import java.text.*;
import java.text.SimpleDateFormat;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;

import com.collectionHub.collectionHub.types.Collection;
import com.collectionHub.collectionHub.types.CollectionItem;

import com.collectionHub.collectionHub.repository.ItemRepository;
import com.collectionHub.collectionHub.entity.Item;

@RestController
public class CollectionController{
    ArrayList<Collection> collectionsList;
    Iterable<Item> databaseItems;

    @Autowired
    private ItemRepository collectionRepository;

    @CrossOrigin(origins = "http://localhost:4567")
    @GetMapping("/allCollections")
    public ArrayList<Collection> allCollections(){
        //jdbc query to get all collections and their info if collectionsList is null
        if(this.collectionsList==null /*|| this.databaseItems.size()>0*/){
            try{
                //Iterable<Item> rows = collectionRepository.findAllItems();
                Iterable<Item> rows = collectionRepository.findAll();
                this.databaseItems = rows;
                ArrayList<String> collectionsAdded=new ArrayList<>();
                this.collectionsList = new ArrayList<>();
                for(Item i: rows){
                    if(collectionsAdded.contains(i.getcollection())){
                        for(int j = 0; j < collectionsList.size();j++){
                            if(collectionsList.get(j).name.equals(i.getcollection())){
                                collectionsList.get(j).collectionList.add(new CollectionItem(i.getcollection(), i.getName(), i.getSeries(), i.getNumber(), i.getDatereleased(), i.getDateOfAcquisition(), i.getProductionRun()));
                                break;
                            }
                        }
                    }else{
                        collectionsAdded.add(i.getcollection());
                        collectionsList.add(new Collection(new CollectionItem(i.getcollection(), i.getName(), i.getSeries(), i.getNumber(), i.getDatereleased(), i.getDateOfAcquisition(), i.getProductionRun())));
                    }
                }
            
            }catch(Exception e){
                System.out.println("Unable to initally query database");
            }
        }
        //if collectionsList is not null, just return its contents
        if(collectionsList.size() == 0){//where jdbc query will be made
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
                for(Item j: databaseItems){//remove from postgres database
                    if(i.name.equals(j.getcollection())){
                        this.collectionRepository.deleteById(j.getid());
                    }
                }
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
                    Item newItem = new Item();
                    newItem.setcollection(item.collectionName());
                    newItem.setName(item.name());
                    newItem.setSeries(item.series());
                    newItem.setNumber(item.number());
                    newItem.setDatereleased(item.dateReleased());
                    newItem.setDateOfAcquisition(item.dateOfAcquisition());
                    newItem.setProductionRun(item.productionRun());
                    System.out.println("Persisting: " + newItem);
                    this.collectionRepository.save(newItem);
                    i.collectionList.add(item);
                    System.out.println("Added " + item.name() + " to " + i.name);
                    return item;
                }
                catch(Exception e){
                    System.out.println("Uanble to parse date or save to repository");
                }
            }
        }
        System.out.println("Sending frontend error, could not find stored collection called " + item.collectionName() + " to add item");
        return null;
    }

    @CrossOrigin(origins = "http://localhost:4567")
    @DeleteMapping("/deleteFromCollections")
    public CollectionItem removeItem(@RequestBody CollectionItem item){
        for(Collection i : collectionsList){
            if(i.name.equals(item.collectionName()/**.substring(1, item.collectionName().length()-1)*/) && i.collectionList.contains(item)){
                i.collectionList.remove(item);
                System.out.println("Removed " + item.name() + " from collection " + item.collectionName());
                return item;
            }
        }
        System.out.println("Sending frontend error, could not find stored collection called " + item.collectionName() + " or could not find item called " + item.name());
        return null;
    }
}