package com.collectionHub.collectionHub.controllers;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import org.springframework.http.MediaType;

import java.util.ArrayList;
import static org.mockito.Mockito.when;
import com.collectionHub.collectionHub.controllers.*;
import com.collectionHub.collectionHub.entity.Item;
import com.collectionHub.collectionHub.repository.ItemRepository;

@WebMvcTest(CollectionController.class)
class CollectionControllerTests{

    @Autowired
    private MockMvc mockMvc;

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
}