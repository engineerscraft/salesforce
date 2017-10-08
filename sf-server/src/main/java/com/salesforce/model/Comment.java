package com.salesforce.model;

import java.util.Date;

public class Comment {

    private String crtdByPubKey;
    private String note;
    private String statusPubKey;
    private String status;
    private String crtdBy;
    private Date crtdOn;
    private String entityPubKey;

    public String getCrtdByPubKey() {
        return crtdByPubKey;
    }
    public void setCrtdByPubKey(String crtdByPubKey) {
        this.crtdByPubKey = crtdByPubKey;
    }
    public String getNote() {
        return note;
    }
    public void setNote(String note) {
        this.note = note;
    }
    public String getStatusPubKey() {
        return statusPubKey;
    }
    public void setStatusPubKey(String statusPubKey) {
        this.statusPubKey = statusPubKey;
    }
    public String getStatus() {
        return status;
    }
    public void setStatus(String status) {
        this.status = status;
    }
    public String getCrtdBy() {
        return crtdBy;
    }
    public void setCrtdBy(String crtdBy) {
        this.crtdBy = crtdBy;
    }
    public Date getCrtdOn() {
        return crtdOn;
    }
    public void setCrtdOn(Date crtdOn) {
        this.crtdOn = crtdOn;
    }
    public String getEntityPubKey() {
        return entityPubKey;
    }
    public void setEntityPubKey(String entityPubKey) {
        this.entityPubKey = entityPubKey;
    }
    @Override
    public String toString() {
        return "Comment [crtdByPubKey=" + crtdByPubKey + ", note=" + note + ", statusPubKey=" + statusPubKey + ", status=" + status + ", crtdBy=" + crtdBy + ", crtdOn=" + crtdOn + ", entityPubKey=" + entityPubKey + "]";
    }
}
