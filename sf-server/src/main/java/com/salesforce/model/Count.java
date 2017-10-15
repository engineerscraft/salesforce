package com.salesforce.model;

/**
 * @author Arnab Kr Ghosh
 *
 */
public class Count {

    private int accountCount;
    private int leadCount;
    private int opportunityCount;
    private int contactCount;

    /**
     * @return the accountCount
     */
    public int getAccountCount() {
        return accountCount;
    }

    /**
     * @param accountCount the accountCount to set
     */
    public void setAccountCount(int accountCount) {
        this.accountCount = accountCount;
    }

    /**
     * @return the leadCount
     */
    public int getLeadCount() {
        return leadCount;
    }

    /**
     * @param leadCount the leadCount to set
     */
    public void setLeadCount(int leadCount) {
        this.leadCount = leadCount;
    }

    /**
     * @return the opportunityCount
     */
    public int getOpportunityCount() {
        return opportunityCount;
    }

    /**
     * @param opportunityCount the opportunityCount to set
     */
    public void setOpportunityCount(int opportunityCount) {
        this.opportunityCount = opportunityCount;
    }

    /**
     * @return the contactCount
     */
    public int getContactCount() {
        return contactCount;
    }

    /**
     * @param contactCount the contactCount to set
     */
    public void setContactCount(int contactCount) {
        this.contactCount = contactCount;
    }

    /* (non-Javadoc)
     * @see java.lang.Object#toString()
     */
    @Override
    public String toString() {
        return "Count [accountCount=" + accountCount + ", leadCount=" + leadCount + ", opportunityCount=" + opportunityCount + ", contactCount=" + contactCount + "]";
    }

}
