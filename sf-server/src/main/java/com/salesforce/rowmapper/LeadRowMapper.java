package com.salesforce.rowmapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import com.salesforce.model.Lead;
import com.salesforce.model.LeadSummary;

public class LeadRowMapper implements RowMapper<Lead> {
    public Lead mapRow(ResultSet rs, int rowNum) throws SQLException {
        Lead lead = new Lead();
        lead.setLeadSummary(new LeadSummary());
        lead.getLeadSummary().setPubKey(rs.getString("PUB_KEY"));
        lead.getLeadSummary().setTitle(rs.getString("TITLE"));
        lead.getLeadSummary().setQuotePrice(rs.getBigDecimal("QUOTE_PRICE"));
        lead.getLeadSummary().setStatusPubKey(rs.getString("STATUS_PUB_KEY"));
        lead.setDiscType(rs.getInt("DISC_TYPE"));
        lead.setDiscVal(rs.getBigDecimal("DISC_VAL"));
        lead.setAccPubKey(rs.getString("ACC_PUB_KEY"));
        lead.setDivPubKey(rs.getString("DIV_PUB_KEY"));
        return lead;
    }
}
