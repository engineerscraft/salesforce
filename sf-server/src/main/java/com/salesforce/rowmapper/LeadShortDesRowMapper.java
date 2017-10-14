package com.salesforce.rowmapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import com.salesforce.model.LeadSummary;

public class LeadShortDesRowMapper implements RowMapper<LeadSummary> {
    public LeadSummary mapRow(ResultSet rs, int rowNum) throws SQLException {
        LeadSummary lead = new LeadSummary();
        lead.setPubKey(rs.getString("PUB_KEY"));
        lead.setQuotePrice(rs.getBigDecimal("QUOTE_PRICE"));
        lead.setTitle(rs.getString("TITLE"));
        return lead;
    }

}
