package com.collectionHub.collectionHub.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;


/**
 * Item Entity class that models "items" database table rows
 */
@Entity
@Table(name = "items")
public class Item {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Long id;//auto generated id primary key
    private String collection;//name of collection item belongs to 
    private String name;//name of item
    private String series;//optional item series
    private Integer number;//number in series
    private String datereleased;//date item was released
    private String dateofacquisition;//date item was acquired
    private Integer productionRun;//production run that the item was released in

    /**
     * Getter for id
     * @return id
     */
    public Long getid(){
        return this.id;
    }

    /**
     * Settter for id
     * @param num number
     */
    public void setid(Long num){
        this.id = num;
    }

    /**
     * Getter for collection
     * @return collection name
     */
    public String getcollection(){
        return this.collection;
    }

    /**
     * Getter for name field
     * @return name of item
     */
    public String getName(){
        return this.name;
    }

    /**
     * Getter for series
     * @return series of item
     */
    public String getSeries(){
        return this.series;
    }

    /**
     * Getter for number
     * @return number of item
     */
    public Integer getNumber(){
        return this.number;
    }

    /**
     * Getter for date item was released
     * @return release date of the item
     */
    public String getDatereleased(){
        return this.datereleased;
    }

    /**
     * Getter for date the item was acquired
     * @return date item was acquired
     */
    public String getDateOfAcquisition(){
        return this.dateofacquisition;
    }

    /**
     * Getter for production run of the item
     * @return number of the production run of the item
     */
    public Integer getProductionRun(){
        return this.productionRun;
    }

    /**
     * Setter for collection
     * @param str string of collection name to be set
     */
    public void setcollection(String str){
        this.collection = str;
    }

    /**
     * Setter for name of item
     * @param str string of name to be set
     */
    public void setName(String str){
        this.name =str;
    }

    /**
     * Setter for series of item
     * @param str string of the series of item to be set
     */
    public void setSeries(String str){
        this.series = str;
    }

    /**
     * Setter for number of item
     * @param num integer of number of item to be set
     */
    public void setNumber(Integer num){
        this.number = num;
    }

    /**
     * Setter for date released string of item
     * @param str string of date of item of when it was released
     */
    public void setDatereleased(String str){
        this.datereleased = str;
    }

    /**
     * Setter for date of acquisition of item
     * @param str string of date of when item was acquired
     */
    public void setDateOfAcquisition(String str){
        this.dateofacquisition = str;
    }

    /**
     * Setter for production run of the item
     * @param num integer number of the item
     */
    public void setProductionRun(Integer num){
        this.productionRun = num;
    }

    /**
     * Object string converter
     */
    public String toString(){
        return "id: " + this.id + " collection: " + this.collection + " name: " + this.name
        + " series: " + this.series + " number: " + this.number + " datereleased: " + this.datereleased + " dateofacquisition: " + this.dateofacquisition +" productionrun: " + this.productionRun;
    }
}