package com.collectionHub.collectionHub.types;

import java.util.*;

public record CollectionItem(
    String name,
    String series, 
    int number,
    Date dateReleased,
    Date dateOfAcquisition,
    int productionRun
){}
