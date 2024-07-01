package com.collectionHub.collectionHub.types;

import java.util.*;

/**
 * Class/Record to model items of a collection that would be managed by application
 */
public record CollectionItem(
    String collectionName,//name of collection
    String name,//name of item
    String series, //series of item
    Integer number,//number of item
    String dateReleased,//date item was released
    String dateOfAcquisition,//date item was acquired
    Integer productionRun//production run of the item
){}
