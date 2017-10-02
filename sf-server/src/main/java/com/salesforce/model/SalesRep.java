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

    private int salesRepId;
    private String pubKey;
    private String fName;
    private String mName;
    private String lName;
    private String supPubKey;
    private int statusId;
    private String extn;
    private String land;
    private String mob;
    private String email;
    @XmlJavaTypeAdapter(DateAdapter.class)
    private Date doj;
    private String desig;
    private String supFName;
    private String supMName;
    private String supLName;
    private String supExtn;
    private String supLand;
    private String supMob;
    private String supEmail;
    private String supDesig;

    /**
     * @return the salesRepId
     */
    public int getSalesRepId() {
        return salesRepId;
    }

    /**
     * @param salesRepId the salesRepId to set
     */
    public void setSalesRepId(int salesRepId) {
        this.salesRepId = salesRepId;
    }

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
     * @return the fName
     */
    public String getfName() {
        return fName;
    }

    /**
     * @param fName the fName to set
     */
    public void setfName(String fName) {
        this.fName = fName;
    }

    /**
     * @return the mName
     */
    public String getmName() {
        return mName;
    }

    /**
     * @param mName the mName to set
     */
    public void setmName(String mName) {
        this.mName = mName;
    }

    /**
     * @return the lName
     */
    public String getlName() {
        return lName;
    }

    /**
     * @param lName the lName to set
     */
    public void setlName(String lName) {
        this.lName = lName;
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
     * @return the extn
     */
    public String getExtn() {
        return extn;
    }

    /**
     * @param extn the extn to set
     */
    public void setExtn(String extn) {
        this.extn = extn;
    }

    /**
     * @return the land
     */
    public String getLand() {
        return land;
    }

    /**
     * @param land the land to set
     */
    public void setLand(String land) {
        this.land = land;
    }

    /**
     * @return the mob
     */
    public String getMob() {
        return mob;
    }

    /**
     * @param mob the mob to set
     */
    public void setMob(String mob) {
        this.mob = mob;
    }

    /**
     * @return the email
     */
    public String getEmail() {
        return email;
    }

    /**
     * @param email the email to set
     */
    public void setEmail(String email) {
        this.email = email;
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
     * @return the desig
     */
    public String getDesig() {
        return desig;
    }

    /**
     * @param desig the desig to set
     */
    public void setDesig(String desig) {
        this.desig = desig;
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
        return "SalesRep [salesRepId=" + salesRepId + ", pubKey=" + pubKey + ", fName=" + fName + ", mName=" + mName + ", lName=" + lName + ", supPubKey=" + supPubKey + ", statusId=" + statusId + ", extn=" + extn + ", land=" + land + ", mob=" + mob
                + ", email=" + email + ", doj=" + doj + ", desig=" + desig + ", supFName=" + supFName + ", supMName=" + supMName + ", supLName=" + supLName + ", supExtn=" + supExtn + ", supLand=" + supLand + ", supMob=" + supMob + ", supEmail=" + supEmail
                + ", supDesig=" + supDesig + "]";
    }

}
