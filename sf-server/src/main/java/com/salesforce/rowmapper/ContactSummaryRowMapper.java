package com.salesforce.rowmapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import com.salesforce.model.ContactSummary;

public class ContactSummaryRowMapper implements RowMapper<ContactSummary> {
    public ContactSummary mapRow(ResultSet rs, int rowNum) throws SQLException {
        ContactSummary contact = new ContactSummary();
        contact.setCoId(rs.getInt("CO_ID"));
        contact.setPubKey(rs.getString("PUB_KEY"));
        contact.setfName(rs.getString("F_NAME"));
        contact.setmName(rs.getString("M_NAME"));
        contact.setlName(rs.getString("L_NAME"));
        contact.setEmail(rs.getString("EMAIL"));
        contact.setCompany(rs.getString("COMPANY"));
        contact.setDesig(rs.getString("DESIG"));
        contact.setMob(rs.getString("MOB"));
        contact.setLand(rs.getString("LAND"));
        contact.setExtn(rs.getString("EXTN"));
        return contact;
    }
}
