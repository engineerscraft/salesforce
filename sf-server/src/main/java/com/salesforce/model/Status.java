package com.salesforce.model;

import javax.xml.bind.annotation.XmlRootElement;

/**
 * @author Arnab Kr Ghosh
 *
 */

@XmlRootElement
public class Status {

    private String pubKey;
    private String des;
    private String color;

    /**
     * @return the pubKey
     */
    public String getPubKey() {
        return pubKey;
    }

    /**
     * @param pubKey the pubKey to set
     */
    public void setPubKey(String pubKey) {
        this.pubKey = pubKey;
    }

    /**
     * @return the des
     */
    public String getDes() {
        return des;
    }

    /**
     * @param des the des to set
     */
    public void setDes(String des) {
        this.des = des;
    }

    /**
     * @return the color
     */
    public String getColor() {
        return color;
    }

    /**
     * @param color the color to set
     */
    public void setColor(String color) {
        this.color = color;
    }

    /* (non-Javadoc)
     * @see java.lang.Object#toString()
     */
    @Override
    public String toString() {
        return "Status [pubKey=" + pubKey + ", des=" + des + ", color=" + color + "]";
    }

}
