package com.collectionHub.collectionHub.repository;

import org.springframework.data.repository.CrudRepository;
import com.collectionHub.collectionHub.entity.Item;
import org.springframework.stereotype.*;
import java.util.List;
import org.springframework.data.jpa.repository.Query;

/**
 * Class to Implement repository absraction of postgres database
 */
@Repository
public interface ItemRepository extends CrudRepository<Item, Long> {
    List<Item> findById(long id);
}