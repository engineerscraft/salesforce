package com.salesforce.model;

import javax.xml.bind.annotation.XmlRootElement;

/**
 * @author Arnab Kr Ghosh
 *
 */

@XmlRootElement
public class AccountSummary {

    private int accId;
    private String pubKey;
    private String title;
    private double soldPrice;

    /**
     * @return the accId
     */
    public int getAccId() {
        return accId;
    }

    /**
     * @param accId the accId to set
     */
    public void setAccId(int accId) {
        this.accId = accId;
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
     * @return the title
     */
    public String getTitle() {
        return title;
    }

    /**
     * @param title the title to set
     */
    public void setTitle(String title) {
        this.title = title;
    }

    /**
     * @return the soldPrice
     */
    public double getSoldPrice() {
        return soldPrice;
    }

    /**
     * @param soldPrice the soldPrice to set
     */
    public void setSoldPrice(double soldPrice) {
        this.soldPrice = soldPrice;
    }

    /* (non-Javadoc)
     * @see java.lang.Object#toString()
     */
    @Override
    public String toString() {
        return "AccountSummary [accId=" + accId + ", pubKey=" + pubKey + ", title=" + title + ", soldPrice=" + soldPrice + "]";
    }

}
