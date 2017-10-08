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
    private List<ContactSummary> contacts;
    private List<ProductAccount> prodAccount;

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

    /* (non-Javadoc)
     * @see java.lang.Object#toString()
     */
    @Override
    public String toString() {
        return "Account [accountSummary=" + accountSummary + ", statusId=" + statusId + ", divPubKey=" + divPubKey + ", contacts=" + contacts + ", prodAccount=" + prodAccount + "]";
    }

}
