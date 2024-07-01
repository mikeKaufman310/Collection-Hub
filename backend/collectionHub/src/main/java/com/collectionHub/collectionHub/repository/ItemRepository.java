package com.collectionHub.collectionHub.repository;

import org.springframework.data.repository.CrudRepository;
import com.collectionHub.collectionHub.entity.Item;
import org.springframework.stereotype.*;
import java.util.List;
import org.springframework.data.jpa.repository.Query;

@Repository
public interface ItemRepository extends CrudRepository<Item, Long> {
    List<Item> findById(long id);

    //@Query("SELECT  FROM items;")
    //Iterable<Item> findAllItems();
}