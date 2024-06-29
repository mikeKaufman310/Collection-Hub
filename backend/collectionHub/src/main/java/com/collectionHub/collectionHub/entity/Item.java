package com.collectionHub.collectionHub.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Item {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long itemId;
    private String collectionName;
    private String name;
    private String series;
    private Integer number;
    private String dateReleased;
    private String dateOfAcquisition;
    private Integer productionRun;

    public Long getItemId(){
        return this.itemId;
    }

    public void setItemId(Long num){
        this.itemId = num;
    }

    public String getCollectionName(){
        return this.collectionName;
    }

    public String getName(){
        return this.name;
    }

    public String getSeries(){
        return this.series;
    }

    public Integer getNumber(){
        return this.number;
    }

    public String getDateReleased(){
        return this.dateReleased;
    }

    public String getDateOfAcquisition(){
        return this.dateOfAcquisition;
    }

    public Integer getProductionRun(){
        return this.productionRun;
    }

    public void setCollectionName(String str){
        this.collectionName = str;
    }

    public void setName(String str){
        this.name =str;
    }

    public void setSeries(String str){
        this.series = str;
    }

    public void setNumber(Integer num){
        this.number = num;
    }

    public void setDateReleased(String str){
        this.dateReleased = str;
    }

    public void setDateOfAcquisition(String str){
        this.dateOfAcquisition = str;
    }

    public void setProductionRun(Integer num){
        this.productionRun = num;
    }
}