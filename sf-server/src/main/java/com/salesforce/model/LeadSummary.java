package com.salesforce.model;

import java.math.BigDecimal;

public class LeadSummary {

    private String pubKey;
    private String title;
    private BigDecimal quotePrice;
    private String statusPubKey;
    public String getPubKey() {
        return pubKey;
    }
    public void setPubKey(String pubKey) {
        this.pubKey = pubKey;
    }
    public String getTitle() {
        return title;
    }
    public void setTitle(String title) {
        this.title = title;
    }
    public BigDecimal getQuotePrice() {
        return quotePrice;
    }
    public void setQuotePrice(BigDecimal quotePrice) {
        this.quotePrice = quotePrice;
    }
    public String getStatusPubKey() {
        return statusPubKey;
    }
    public void setStatusPubKey(String statusPubKey) {
        this.statusPubKey = statusPubKey;
    }
    @Override
    public String toString() {
        return "LeadSummary [pubKey=" + pubKey + ", title=" + title + ", quotePrice=" + quotePrice + ", statusPubKey=" + statusPubKey + "]";
    }
}
