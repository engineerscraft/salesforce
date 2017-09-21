package com.salesforce.model;

public class ContactSummary {
    
    private int coId;
    private String pubKey;
    private String fName;
    private String mName;
    private String lName;
    private String email;
    private String company;
    private String desig;
    private String mob;
    private String land;
    private String extn;
    
    public int getCoId() {
        return coId;
    }
    public void setCoId(int coId) {
        this.coId = coId;
    }
    public String getPubKey() {
        return pubKey;
    }
    public void setPubKey(String pubKey) {
        this.pubKey = pubKey;
    }
    public String getfName() {
        return fName;
    }
    public void setfName(String fName) {
        this.fName = fName;
    }
    public String getmName() {
        return mName;
    }
    public void setmName(String mName) {
        this.mName = mName;
    }
    public String getlName() {
        return lName;
    }
    public void setlName(String lName) {
        this.lName = lName;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getMob() {
        return mob;
    }
    public void setMob(String mob) {
        this.mob = mob;
    }
    public String getLand() {
        return land;
    }
    public void setLand(String land) {
        this.land = land;
    }
    public String getExtn() {
        return extn;
    }
    public void setExtn(String extn) {
        this.extn = extn;
    }
    public String getCompany() {
        return company;
    }
    public void setCompany(String company) {
        this.company = company;
    }
    public String getDesig() {
        return desig;
    }
    public void setDesig(String desig) {
        this.desig = desig;
    }
}