package com.collectionHub.collectionHub.types;

import java.util.*;

public record CollectionItem(
    String name,
    String series, 
    Integer number,
    Date dateReleased,
    Date dateOfAcquisition,
    Integer productionRun
){}
