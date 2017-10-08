package com.salesforce.model;

import java.math.BigDecimal;
import java.util.List;

public class Lead {
    private LeadSummary leadSummary;
    private int discType;
    private BigDecimal discVal;
    private String divPubKey;
    private String accPubKey;
    private List<ContactSummary> contacts;
    private List<ProductInstance> prodInstances;
    private String changeDes;
    private boolean readOnly;
    
    public LeadSummary getLeadSummary() {
        return leadSummary;
    }
    public void setLeadSummary(LeadSummary leadSummary) {
        this.leadSummary = leadSummary;
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
    public String getDivPubKey() {
        return divPubKey;
    }
    public void setDivPubKey(String divPubKey) {
        this.divPubKey = divPubKey;
    }
    public String getAccPubKey() {
        return accPubKey;
    }
    public void setAccPubKey(String accPubKey) {
        this.accPubKey = accPubKey;
    }
    public List<ProductInstance> getProdInstances() {
        return prodInstances;
    }
    public void setProdInstances(List<ProductInstance> prodInstances) {
        this.prodInstances = prodInstances;
    }
    public List<ContactSummary> getContacts() {
        return contacts;
    }
    public void setContacts(List<ContactSummary> contacts) {
        this.contacts = contacts;
    }
    public String getChangeDes() {
        return changeDes;
    }
    public void setChangeDes(String changeDes) {
        this.changeDes = changeDes;
    }
    public boolean isReadOnly() {
        return readOnly;
    }
    public void setReadOnly(boolean readOnly) {
        this.readOnly = readOnly;
    }
    @Override
    public String toString() {
        return "Lead [leadSummary=" + leadSummary + ", discType=" + discType + ", discVal=" + discVal + ", divPubKey=" + divPubKey + ", accPubKey=" + accPubKey + ", contacts=" + contacts + ", prodInstances=" + prodInstances + ", changeDes=" + changeDes
                + ", readOnly=" + readOnly + "]";
    }
}
