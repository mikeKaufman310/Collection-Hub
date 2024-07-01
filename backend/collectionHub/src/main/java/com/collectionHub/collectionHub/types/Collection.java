package com.collectionHub.collectionHub.types;

import java.util.ArrayList;

/**
 * Class to model a collection managed by the application
 */
public class Collection{
    public ArrayList<CollectionItem> collectionList;//list of items in the collection
    public String name;//name of the collection

    /**
     * Constructor
     */
    public Collection(){
        collectionList = new ArrayList<>();
        name = null;
    }

    /**
     * Constructor
     */
    public Collection(Collection oldCollection){
        this.collectionList = oldCollection.collectionList;
        this.name = "New " + oldCollection.name;
    }

    /**
     * Constructor
     */
    public Collection(CollectionItem firstPiece){
        collectionList = new ArrayList<>();
        collectionList.add(firstPiece);
        this.name = firstPiece.collectionName();
    }

    /**
     * Constructor
     */
    public Collection(String name){
        collectionList = new ArrayList<>();
        this.name = name;
    }

    /**
     * Constructor
     */
    public Collection(CollectionItem firstPiece, String name){
        collectionList = new ArrayList<>();
        collectionList.add(firstPiece);
        this.name = name;
    }

    /**
     * Constructor
     */
    public Collection(Collection oldCollection, String newName){
        this.collectionList = oldCollection.collectionList;
        this.name = newName;
    }

    /**
     * Constructor
     */
    public Collection(ArrayList<CollectionItem> list, String name){
        this.collectionList = list;
        this.name = name;
    }
}