package com.collectionHub.collectionHub.types;

import java.util.ArrayList;

public class Collection{
    public ArrayList<CollectionItem> collectionList;
    public String name;

    public Collection(){
        collectionList = new ArrayList<>();
        name = null;
    }

    public Collection(Collection oldCollection){
        this.collectionList = oldCollection.collectionList;
        this.name = "New " + oldCollection.name;
    }

    public Collection(CollectionItem firstPiece){
        collectionList = new ArrayList<>();
        collectionList.add(firstPiece);
        name = "Collection of " + firstPiece.series() + " items";
    }

    public Collection(String name){
        collectionList = new ArrayList<>();
        this.name = name;
    }

    public Collection(CollectionItem firstPiece, String name){
        collectionList = new ArrayList<>();
        collectionList.add(firstPiece);
        this.name = name;
    }

    public Collection(Collection oldCollection, String newName){
        this.collectionList = oldCollection.collectionList;
        this.name = newName;
    }

    public Collection(ArrayList<CollectionItem> list, String name){
        this.collectionList = list;
        this.name = name;
    }
}