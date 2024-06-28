package main.java.com.collectionHub.collectionHub;

import org.springframework.data.repository.CrudRepository;
import main.java.com.collectionHub.collectionHub.entity.CollectionItem;

public interface CollectionItemRepository extends CrudRepository<CollectionItem, Long> {
    CollectionItem findById(long id);
}