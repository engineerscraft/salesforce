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
    private String supFName;
    private String supMName;
    private String supLName;
    private String supExtn;
    private String supLand;
    private String supMob;
    private String supEmail;
    private String supDesig;

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

    /**
     * @return the supFName
     */
    public String getSupFName() {
        return supFName;
    }

    /**
     * @param supFName the supFName to set
     */
    public void setSupFName(String supFName) {
        this.supFName = supFName;
    }

    /**
     * @return the supMName
     */
    public String getSupMName() {
        return supMName;
    }

    /**
     * @param supMName the supMName to set
     */
    public void setSupMName(String supMName) {
        this.supMName = supMName;
    }

    /**
     * @return the supLName
     */
    public String getSupLName() {
        return supLName;
    }

    /**
     * @param supLName the supLName to set
     */
    public void setSupLName(String supLName) {
        this.supLName = supLName;
    }

    /**
     * @return the supExtn
     */
    public String getSupExtn() {
        return supExtn;
    }

    /**
     * @param supExtn the supExtn to set
     */
    public void setSupExtn(String supExtn) {
        this.supExtn = supExtn;
    }

    /**
     * @return the supLand
     */
    public String getSupLand() {
        return supLand;
    }

    /**
     * @param supLand the supLand to set
     */
    public void setSupLand(String supLand) {
        this.supLand = supLand;
    }

    /**
     * @return the supMob
     */
    public String getSupMob() {
        return supMob;
    }

    /**
     * @param supMob the supMob to set
     */
    public void setSupMob(String supMob) {
        this.supMob = supMob;
    }

    /**
     * @return the supEmail
     */
    public String getSupEmail() {
        return supEmail;
    }

    /**
     * @param supEmail the supEmail to set
     */
    public void setSupEmail(String supEmail) {
        this.supEmail = supEmail;
    }

    /**
     * @return the supDesig
     */
    public String getSupDesig() {
        return supDesig;
    }

    /**
     * @param supDesig the supDesig to set
     */
    public void setSupDesig(String supDesig) {
        this.supDesig = supDesig;
    }

    /* (non-Javadoc)
     * @see java.lang.Object#toString()
     */
    @Override
    public String toString() {
        return "SalesRep [salesRepSummary=" + salesRepSummary + ", supPubKey=" + supPubKey + ", statusId=" + statusId + ", doj=" + doj + ", supFName=" + supFName + ", supMName=" + supMName + ", supLName=" + supLName + ", supExtn=" + supExtn + ", supLand="
                + supLand + ", supMob=" + supMob + ", supEmail=" + supEmail + ", supDesig=" + supDesig + "]";
    }

}
