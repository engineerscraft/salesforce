package com.salesforce.model;

import java.math.BigDecimal;

/**
 * @author Arnab Kr Ghosh
 *
 */
public class ProductAccount {
    private String pubKey;
    private String des;
    private BigDecimal soldPrice;
    private int discType;
    private BigDecimal discVal;

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
     * @return the soldPrice
     */
    public BigDecimal getSoldPrice() {
        return soldPrice;
    }

    /**
     * @param soldPrice the soldPrice to set
     */
    public void setSoldPrice(BigDecimal soldPrice) {
        this.soldPrice = soldPrice;
    }

    /**
     * @return the discType
     */
    public int getDiscType() {
        return discType;
    }

    /**
     * @param discType the discType to set
     */
    public void setDiscType(int discType) {
        this.discType = discType;
    }

    /**
     * @return the discVal
     */
    public BigDecimal getDiscVal() {
        return discVal;
    }

    /**
     * @param discVal the discVal to set
     */
    public void setDiscVal(BigDecimal discVal) {
        this.discVal = discVal;
    }

    /* (non-Javadoc)
     * @see java.lang.Object#toString()
     */
    @Override
    public String toString() {
        return "ProductAccount [pubKey=" + pubKey + ", des=" + des + ", soldPrice=" + soldPrice + ", discType=" + discType + ", discVal=" + discVal + "]";
    }

}
