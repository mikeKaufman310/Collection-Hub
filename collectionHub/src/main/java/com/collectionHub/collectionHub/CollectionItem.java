package com.collectionHub.collectionHub;

import java.util.*;

public record CollectionItem(
    String name,
    String series, 
    int number,
    Date dateReleased,
    Date dateOfAcquisition,
    int productionRun
){}
