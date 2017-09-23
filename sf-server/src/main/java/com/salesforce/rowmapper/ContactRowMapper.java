package com.salesforce.rowmapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import com.salesforce.model.Contact;
import com.salesforce.model.ContactSummary;

public class ContactRowMapper implements RowMapper<Contact> {

    @Override
    public Contact mapRow(ResultSet rs, int rowNum) throws SQLException {
        Contact contact = new Contact();
        contact.setContactSummary(new ContactSummary());
        contact.setAddrLine1(rs.getString("ADDR_LINE_1"));
        contact.setAddrLine2(rs.getString("ADDR_LINE_2"));
        contact.setcId(rs.getInt("C_ID")==0?null:rs.getInt("C_ID"));
        contact.setdId(rs.getInt("D_ID")==0?null:rs.getInt("D_ID"));
        contact.setNote(rs.getString("note"));
        contact.setsId(rs.getInt("S_ID")==0?null:rs.getInt("S_ID"));
        contact.setZipCode(rs.getString("ZIP_CODE"));
        contact.getContactSummary().setCoId(rs.getInt("CO_ID"));
        contact.getContactSummary().setCompany(rs.getString("COMPANY"));
        contact.getContactSummary().setDesig(rs.getString("DESIG"));
        contact.getContactSummary().setEmail(rs.getString("EMAIL"));
        contact.getContactSummary().setExtn(rs.getString("EXTN"));
        contact.getContactSummary().setfName(rs.getString("F_NAME"));
        contact.getContactSummary().setLand(rs.getString("LAND"));
        contact.getContactSummary().setlName(rs.getString("L_NAME"));
        contact.getContactSummary().setmName(rs.getString("M_NAME"));
        contact.getContactSummary().setMob(rs.getString("MOB"));
        contact.getContactSummary().setPubKey(rs.getString("PUB_KEY"));
        return contact;
    }
}
