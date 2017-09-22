package com.salesforce.model;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class Contact {

    private ContactSummary contactSummary;
    private String addrLine1;
    private String addrLine2;
    private String dName;
    private String sName;
    private String cName;
    private Integer dId;
    private Integer sId;
    private Integer cId;
    private String zipCode;
    private String note;

    /**
     * @return the contactSummary
     */
    public ContactSummary getContactSummary() {
        return contactSummary;
    }

    /**
     * @param contactSummary the contactSummary to set
     */
    public void setContactSummary(ContactSummary contactSummary) {
        this.contactSummary = contactSummary;
    }

    /**
     * @return the addrLine1
     */
    public String getAddrLine1() {
        return addrLine1;
    }

    /**
     * @param addrLine1 the addrLine1 to set
     */
    public void setAddrLine1(String addrLine1) {
        this.addrLine1 = addrLine1;
    }

    /**
     * @return the addrLine2
     */
    public String getAddrLine2() {
        return addrLine2;
    }

    /**
     * @param addrLine2 the addrLine2 to set
     */
    public void setAddrLine2(String addrLine2) {
        this.addrLine2 = addrLine2;
    }

    /**
     * @return the dName
     */
    public String getdName() {
        return dName;
    }

    /**
     * @param dName the dName to set
     */
    public void setdName(String dName) {
        this.dName = dName;
    }

    /**
     * @return the sName
     */
    public String getsName() {
        return sName;
    }

    /**
     * @param sName the sName to set
     */
    public void setsName(String sName) {
        this.sName = sName;
    }

    /**
     * @return the cName
     */
    public String getcName() {
        return cName;
    }

    /**
     * @param cName the cName to set
     */
    public void setcName(String cName) {
        this.cName = cName;
    }

    /**
     * @return the dId
     */
    public Integer getdId() {
        return dId;
    }

    /**
     * @param dId the dId to set
     */
    public void setdId(Integer dId) {
        this.dId = dId;
    }

    /**
     * @return the sId
     */
    public Integer getsId() {
        return sId;
    }

    /**
     * @param sId the sId to set
     */
    public void setsId(Integer sId) {
        this.sId = sId;
    }

    /**
     * @return the cId
     */
    public Integer getcId() {
        return cId;
    }

    /**
     * @param cId the cId to set
     */
    public void setcId(Integer cId) {
        this.cId = cId;
    }

    /**
     * @return the zipCode
     */
    public String getZipCode() {
        return zipCode;
    }

    /**
     * @param zipCode the zipCode to set
     */
    public void setZipCode(String zipCode) {
        this.zipCode = zipCode;
    }

    /**
     * @return the note
     */
    public String getNote() {
        return note;
    }

    /**
     * @param note the note to set
     */
    public void setNote(String note) {
        this.note = note;
    }

    /* (non-Javadoc)
     * @see java.lang.Object#toString()
     */
    @Override
    public String toString() {
        return "Contact [contactSummary=" + contactSummary + ", addrLine1=" + addrLine1 + ", addrLine2=" + addrLine2 + ", dName=" + dName + ", sName=" + sName + ", cName=" + cName + ", dId=" + dId + ", sId=" + sId + ", cId=" + cId + ", zipCode=" + zipCode
                + ", note=" + note + "]";
    }
}
