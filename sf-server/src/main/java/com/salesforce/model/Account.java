package com.salesforce.model;

import java.util.List;

/**
 * @author Arnab Kr Ghosh
 *
 */
public class Account {
    private AccountSummary accountSummary;
    private int statusId;
    private String divPubKey;
    private String changeDes;
    private List<ContactSummary> contacts;
    private List<ProductAccount> prodAccount;
    private List<LeadSummary> leads;
    private List<OpportunitySummary> opportunities;

    /**
     * @return the accountSummary
     */
    public AccountSummary getAccountSummary() {
        return accountSummary;
    }

    /**
     * @param accountSummary the accountSummary to set
     */
    public void setAccountSummary(AccountSummary accountSummary) {
        this.accountSummary = accountSummary;
    }

    /**
     * @return the statusId
     */
    public int getStatusId() {
        return statusId;
    }

    /**
     * @param statusId the statusId to set
     */
    public void setStatusId(int statusId) {
        this.statusId = statusId;
    }

    /**
     * @return the divPubKey
     */
    public String getDivPubKey() {
        return divPubKey;
    }

    /**
     * @param divPubKey the divPubKey to set
     */
    public void setDivPubKey(String divPubKey) {
        this.divPubKey = divPubKey;
    }

    /**
     * @return the changeDes
     */
    public String getChangeDes() {
        return changeDes;
    }

    /**
     * @param changeDes the changeDes to set
     */
    public void setChangeDes(String changeDes) {
        this.changeDes = changeDes;
    }

    /**
     * @return the contacts
     */
    public List<ContactSummary> getContacts() {
        return contacts;
    }

    /**
     * @param contacts the contacts to set
     */
    public void setContacts(List<ContactSummary> contacts) {
        this.contacts = contacts;
    }

    /**
     * @return the prodAccount
     */
    public List<ProductAccount> getProdAccount() {
        return prodAccount;
    }

    /**
     * @param prodAccount the prodAccount to set
     */
    public void setProdAccount(List<ProductAccount> prodAccount) {
        this.prodAccount = prodAccount;
    }

    /**
     * @return the leads
     */
    public List<LeadSummary> getLeads() {
        return leads;
    }

    /**
     * @param leads the leads to set
     */
    public void setLeads(List<LeadSummary> leads) {
        this.leads = leads;
    }

    /**
     * @return the opportunities
     */
    public List<OpportunitySummary> getOpportunities() {
        return opportunities;
    }

    /**
     * @param opportunities the opportunities to set
     */
    public void setOpportunities(List<OpportunitySummary> opportunities) {
        this.opportunities = opportunities;
    }

    /* (non-Javadoc)
     * @see java.lang.Object#toString()
     */
    @Override
    public String toString() {
        return "Account [accountSummary=" + accountSummary + ", statusId=" + statusId + ", divPubKey=" + divPubKey + ", changeDes=" + changeDes + ", contacts=" + contacts + ", prodAccount=" + prodAccount + ", leads=" + leads + ", opportunities="
                + opportunities + "]";
    }

}
