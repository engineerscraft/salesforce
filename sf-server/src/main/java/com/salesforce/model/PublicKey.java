package com.salesforce.model;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class PublicKey {
    private String pubKey;

    public String getPubKey() {
        return pubKey;
    }

    public void setPubKey(String pubKey) {
        this.pubKey = pubKey;
    }
}
