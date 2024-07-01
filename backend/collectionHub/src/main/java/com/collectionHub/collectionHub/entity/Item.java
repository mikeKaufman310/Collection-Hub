package com.collectionHub.collectionHub.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "items")
public class Item {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Long id;
    private String collection;
    private String name;
    private String series;
    private Integer number;
    private String datereleased;
    private String dateofacquisition;
    private Integer productionRun;

    public Long getid(){
        return this.id;
    }

    public void setid(Long num){
        this.id = num;
    }

    public String getcollection(){
        return this.collection;
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

    public String getDatereleased(){
        return this.datereleased;
    }

    public String getDateOfAcquisition(){
        return this.dateofacquisition;
    }

    public Integer getProductionRun(){
        return this.productionRun;
    }

    public void setcollection(String str){
        this.collection = str;
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

    public void setDatereleased(String str){
        this.datereleased = str;
    }

    public void setDateOfAcquisition(String str){
        this.dateofacquisition = str;
    }

    public void setProductionRun(Integer num){
        this.productionRun = num;
    }

    public String toString(){
        return "id: " + this.id + " collection: " + this.collection + " name: " + this.name
        + " series: " + this.series + " number: " + this.number + " datereleased: " + this.datereleased + " dateofacquisition: " + this.dateofacquisition +" productionrun: " + this.productionRun;
    }
}