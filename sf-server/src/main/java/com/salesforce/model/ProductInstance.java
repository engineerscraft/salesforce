package com.salesforce.model;

import java.math.BigDecimal;

public class ProductInstance {
    private String pubKey;
    private String des;
    private BigDecimal quotePrice;
    private BigDecimal actualPrice;
    private int discType;
    private BigDecimal discVal;
    private int unit;
    public String getPubKey() {
        return pubKey;
    }
    public void setPubKey(String pubKey) {
        this.pubKey = pubKey;
    }
    public BigDecimal getQuotePrice() {
        return quotePrice;
    }
    public void setQuotePrice(BigDecimal quotePrice) {
        this.quotePrice = quotePrice;
    }
    public int getDiscType() {
        return discType;
    }
    public void setDiscType(int discType) {
        this.discType = discType;
    }
    public BigDecimal getDiscVal() {
        return discVal;
    }
    public void setDiscVal(BigDecimal discVal) {
        this.discVal = discVal;
    }
    public int getUnit() {
        return unit;
    }
    public void setUnit(int unit) {
        this.unit = unit;
    }
    public BigDecimal getActualPrice() {
        return actualPrice;
    }
    public void setActualPrice(BigDecimal actualPrice) {
        this.actualPrice = actualPrice;
    }
    public String getDes() {
        return des;
    }
    public void setDes(String des) {
        this.des = des;
    }
    @Override
    public String toString() {
        return "ProductInstance [pubKey=" + pubKey + ", des=" + des + ", quotePrice=" + quotePrice + ", actualPrice=" + actualPrice + ", discType=" + discType + ", discVal=" + discVal + ", unit=" + unit + "]";
    }
}
