package com.collectionHub.collectionHub.repository;

import org.springframework.data.repository.CrudRepository;
import com.collectionHub.collectionHub.entity.Item;
import org.springframework.stereotype.Repository;

@Repository
public interface ItemRepository extends CrudRepository<Item, Long> {
    Item findById(long id);
}