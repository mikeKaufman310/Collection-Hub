package com.collectionHub.collectionHub.controllers;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import org.springframework.http.MediaType;

import java.util.ArrayList;
import static org.mockito.Mockito.when;
import org.mockito.Mockito;
import com.collectionHub.collectionHub.controllers.*;
import com.collectionHub.collectionHub.entity.Item;
import com.collectionHub.collectionHub.repository.ItemRepository;
import com.collectionHub.collectionHub.types.CollectionItem;

@WebMvcTest(CollectionController.class)
class CollectionControllerTests{

    @Autowired
    private MockMvc mockMvc;

    //@Autowired
    //private ObjectMapper objectMapper;

    @MockBean
    private ItemRepository itemRepo;

    @Test
    void testAllCollections() throws Exception{
        when(itemRepo.findAll()).thenReturn(new ArrayList<>());
        mockMvc.perform(get("/allCollections")).andExpect(status().isOk());
    }

    @Test
    void testGetCollection() throws Exception{
        String collectionName = "collection";
        when(itemRepo.findAll()).thenReturn(new ArrayList<>());
        mockMvc.perform(get("/allCollections"));
        mockMvc.perform(post("/getCollection").contentType(MediaType.APPLICATION_JSON).content(collectionName)).andExpect(status().isOk());
    }

    @Test
    void testDeleteCollection() throws Exception{
        String collectionName = "collection";
        when(itemRepo.findAll()).thenReturn(new ArrayList<>());
        mockMvc.perform(get("/allCollections"));
        //when(itemRepo.deleteById()).
        mockMvc.perform(delete("/allCollections").contentType(MediaType.APPLICATION_JSON).content(collectionName)).andExpect(status().isOk());
    }

    @Test
    void testAddCollection() throws Exception{
        String collectionName = "collection";
        when(itemRepo.findAll()).thenReturn(new ArrayList<>());
        mockMvc.perform(get("/allCollections"));
        mockMvc.perform(post("/allCollections").contentType(MediaType.APPLICATION_JSON).content(collectionName)).andExpect(status().isOk());
    }

    @Test
    void testAddItemToCollection() throws Exception{
        when(itemRepo.findAll()).thenReturn(new ArrayList<>());
        mockMvc.perform(get("/allCollections"));
        CollectionItem item = new CollectionItem("collection", "item", null, null, null, null, null);
        Item itemItem = new Item();
        itemItem.setcollection(item.collectionName());
        itemItem.setName(item.name());
        mockMvc.perform(post("/allCollections").contentType(MediaType.APPLICATION_JSON).content("collection")).andExpect(status().isOk());
        when(itemRepo.save(itemItem)).thenReturn(itemItem);
        mockMvc.perform(post("/addToCollections").contentType(MediaType.APPLICATION_JSON).content("{\"collectionName\": \"ollectio\", \"name\": \"\", \"series\": \"\", \"number\": null, \"dateReleased\": \"\", \"dateOfAcquisition\": \"\", \"productionRun\": null}")).andExpect(status().isOk()); 
    }

    @Test
    void testRemoveItem() throws Exception{
        when(itemRepo.findAll()).thenReturn(new ArrayList<>());
        mockMvc.perform(get("/allCollections"));
        mockMvc.perform(post("/allCollections").contentType(MediaType.APPLICATION_JSON).content("collection")).andExpect(status().isOk());
        mockMvc.perform(delete("/deleteFromCollections").contentType(MediaType.APPLICATION_JSON).content("{\"collectionName\": \"ollectio\", \"name\": \"\", \"series\": \"\", \"number\": null, \"dateReleased\": \"\", \"dateOfAcquisition\": \"\", \"productionRun\": null}")).andExpect(status().isOk());
    }
}