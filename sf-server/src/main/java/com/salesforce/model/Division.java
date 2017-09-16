package com.salesforce.model;

import javax.xml.bind.annotation.XmlRootElement;

/**
 * @author Arnab Kr Ghosh
 *
 */

@XmlRootElement
public class Division {

    private int divId;
    private String pubKey;
    private String des;

    /**
     * @return the divId
     */
    public int getDivId() {
        return divId;
    }

    /**
     * @param divId the divId to set
     */
    public void setDivId(int divId) {
        this.divId = divId;
    }

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

    /* (non-Javadoc)
     * @see java.lang.Object#toString()
     */
    @Override
    public String toString() {
        return "Division [divId=" + divId + ", pubKey=" + pubKey + ", des=" + des + "]";
    }

}
