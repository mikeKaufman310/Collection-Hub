package com.collectionHub.collectionHub.types;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import static org.junit.jupiter.api.Assertions.*;

import java.util.ArrayList;

import com.collectionHub.collectionHub.types.Collection;
import com.collectionHub.collectionHub.types.CollectionItem;

/**
 * Class to test collection object type
 */
@SpringBootTest
class CollectionTests{

    /**
     * Test to test empty constructor
     */
    @Test
    void emptyConstructor(){
        Collection col = new Collection();
        assertNull(col.name, "Name field not null when using empty constructor");
        assertTrue(col.collectionList.size() == 0, "Size of collection list field was not zero when using empty constructor");
    }

    /**
     * Test to test constructor that passes another collection object
     */
    @Test
    void oldCollectionConstructor(){
        Collection old1 = new Collection();
        old1.name = "old";
        Collection newCol1 = new Collection(old1);
        assertTrue(newCol1.collectionList.size() == 0);
        assertTrue(newCol1.name.equals("New old"));
        Collection old2 = new Collection();
        old2.collectionList.add(new CollectionItem("old2", "testItem", null, null, null, null, null));
        Collection newCol2 = new Collection(old2);
        assertNotNull(newCol2.collectionList.get(0));
        assertTrue(newCol2.collectionList.size() == 1);
        assertTrue(newCol2.name.equals("New collection"), "The new collections name is " + newCol2.name);
        old2.name = "old2";
        Collection newCol3 = new Collection(old2);
        assertTrue(newCol3.name.equals("New old2"));
    }

    /**
     * Test to test constructor with pass collection item record
     */
    @Test
    void firstPieceConstructor(){
        CollectionItem piece1 = new CollectionItem("col1", "piece1", null, null, null, null, null);
        Collection col1 = new Collection(piece1);
        assertTrue(col1.collectionList.size()==1);
        assertTrue(col1.name.equals("col1"));
        assertNotNull(col1.name);
        CollectionItem piece2 = new CollectionItem(null, null, null, null, null, null, null);
        col1 = new Collection(piece2);
        assertTrue(col1.collectionList.size()==1);
        assertNull(col1.name);
    }

    /**
     * Test to test constructor with passed string
     */
    @Test
    void nameConstructor(){
        Collection col1 = new Collection("col1");
        assertTrue(col1.collectionList.size()==0);
        assertNotNull(col1.name);
        assertTrue(col1.name.equals("col1"));
        col1 = new Collection("");
        assertTrue(col1.name.equals(""));
    }

    /**
     * Test to test constructor with collection item and string passed
     */
    @Test
    void pieceAndNameConstructor(){
        Collection col1 = new Collection(new CollectionItem(null, null, null, null, null, null, null), "col1");
        assertTrue(col1.collectionList.size()==1);
        assertTrue(col1.name.equals("col1"));
    }

    /**
     * Test to test constructor with collection object and string passed
     */
    @Test
    void oldCollectionAndNameConstructor(){
        Collection old1 = new Collection(new CollectionItem(null, null, null, null, null, null, null), "old1");
        Collection new1 = new Collection(old1, "new1");
        assertTrue(new1.collectionList.size()==1);
        assertFalse(new1.name.equals("old1"));
        assertTrue(new1.name.equals("new1"));
    }

    /**
     * Test to test constructor with list collection object and string passed
     */
    @Test
    void listAndNameConstructor(){
        ArrayList<CollectionItem> list = new ArrayList<>();
        list.add(new CollectionItem(null, "piec1", null, null, null, null, null));
        Collection col1 = new Collection(list, "col1");
        assertTrue(col1.collectionList.size()==1);
        assertTrue(col1.collectionList.get(0).name().equals("piec1"));
        assertTrue(col1.name.equals("col1"));
        col1 = new Collection(list, null);
        assertNull(col1.name);
    }
}
