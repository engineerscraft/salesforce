package com.salesforce.model;

public class LeadSummary {

    private int leadId;
    private String pubKey;
    private String title;
    private double quotePrice;
    public int getLeadId() {
        return leadId;
    }
    public void setLeadId(int leadId) {
        this.leadId = leadId;
    }
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
    public double getQuotePrice() {
        return quotePrice;
    }
    public void setQuotePrice(double quotePrice) {
        this.quotePrice = quotePrice;
    }
    @Override
    public String toString() {
        return "LeadSummary [leadId=" + leadId + ", pubKey=" + pubKey + ", title=" + title + ", quotePrice=" + quotePrice + "]";
    }
}
