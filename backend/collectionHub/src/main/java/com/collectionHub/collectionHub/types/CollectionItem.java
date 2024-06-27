package com.collectionHub.collectionHub.types;

import java.util.*;

public record CollectionItem(
    String collectionName,
    String name,
    String series, 
    Integer number,
    String dateReleased,
    String dateOfAcquisition,
    Integer productionRun
){}
