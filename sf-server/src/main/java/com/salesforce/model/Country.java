package com.salesforce.model;

import javax.xml.bind.annotation.XmlRootElement;

/**
 * @author Arnab Kr Ghosh
 *
 */

@XmlRootElement
public class Country {

    private int cId;
    private String cName;

    /**
     * @return the cId
     */
    public int getcId() {
        return cId;
    }

    /**
     * @param cId the cId to set
     */
    public void setcId(int cId) {
        this.cId = cId;
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

    /* (non-Javadoc)
     * @see java.lang.Object#toString()
     */
    @Override
    public String toString() {
        return "Country [cId=" + cId + ", cName=" + cName + "]";
    }

}
