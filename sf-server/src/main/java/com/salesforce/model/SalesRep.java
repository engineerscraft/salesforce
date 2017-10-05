package com.salesforce.model;

import java.util.Date;

import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.adapters.XmlJavaTypeAdapter;

import com.salesforce.utils.DateAdapter;

/**
 * @author Arnab Kr Ghosh
 *
 */
@XmlRootElement
public class SalesRep {

    private SalesRepSummary salesRepSummary;
    private String supPubKey;
    private int statusId;
    @XmlJavaTypeAdapter(DateAdapter.class)
    private Date doj;

    /**
     * @return the salesRepSummary
     */
    public SalesRepSummary getSalesRepSummary() {
        return salesRepSummary;
    }

    /**
     * @param salesRepSummary the salesRepSummary to set
     */
    public void setSalesRepSummary(SalesRepSummary salesRepSummary) {
        this.salesRepSummary = salesRepSummary;
    }

    /**
     * @return the supPubKey
     */
    public String getSupPubKey() {
        return supPubKey;
    }

    /**
     * @param supPubKey the supPubKey to set
     */
    public void setSupPubKey(String supPubKey) {
        this.supPubKey = supPubKey;
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
     * @return the doj
     */
    public Date getDoj() {
        return doj;
    }

    /**
     * @param doj the doj to set
     */
    public void setDoj(Date doj) {
        this.doj = doj;
    }

    /* (non-Javadoc)
     * @see java.lang.Object#toString()
     */
    @Override
    public String toString() {
        return "SalesRep [salesRepSummary=" + salesRepSummary + ", supPubKey=" + supPubKey + ", statusId=" + statusId + ", doj=" + doj + "]";
    }

}
