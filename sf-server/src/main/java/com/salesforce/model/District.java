package com.salesforce.model;

import javax.xml.bind.annotation.XmlRootElement;

/**
 * @author Arnab Kr Ghosh
 *
 */

@XmlRootElement
public class District {

    private int dId;
    private String dName;

    /**
     * @return the dId
     */
    public int getdId() {
        return dId;
    }

    /**
     * @param dId the dId to set
     */
    public void setdId(int dId) {
        this.dId = dId;
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

    /* (non-Javadoc)
     * @see java.lang.Object#toString()
     */
    @Override
    public String toString() {
        return "District [dId=" + dId + ", dName=" + dName + "]";
    }
}
