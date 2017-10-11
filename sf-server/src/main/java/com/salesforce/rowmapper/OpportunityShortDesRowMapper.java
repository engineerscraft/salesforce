package com.salesforce.rowmapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import com.salesforce.model.OpportunitySummary;

public class OpportunityShortDesRowMapper implements RowMapper<OpportunitySummary> {
    public OpportunitySummary mapRow(ResultSet rs, int rowNum) throws SQLException {
        OpportunitySummary opportunity = new OpportunitySummary();
        opportunity.setPubKey(rs.getString("PUB_KEY"));
        opportunity.setQuotePrice(rs.getBigDecimal("QUOTE_PRICE"));
        opportunity.setTitle(rs.getString("TITLE"));
        return opportunity;
    }

}
