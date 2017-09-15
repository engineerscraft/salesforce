package com.salesforce.model;

import javax.xml.bind.annotation.XmlRootElement;

/**
 * @author Arnab Kr Ghosh
 *
 */

@XmlRootElement
public class State {

    private int sId;
    private String sName;

    /**
     * @return the sId
     */
    public int getsId() {
        return sId;
    }

    /**
     * @param sId the sId to set
     */
    public void setsId(int sId) {
        this.sId = sId;
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

    /* (non-Javadoc)
     * @see java.lang.Object#toString()
     */
    @Override
    public String toString() {
        return "State [sId=" + sId + ", sName=" + sName + "]";
    }

}
