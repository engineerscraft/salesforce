package com.salesforce.rowmapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import com.salesforce.model.OpportunitySummary;

public class OpportunitySummaryRowMapper implements RowMapper<OpportunitySummary> {

    @Override
    public OpportunitySummary mapRow(ResultSet rs, int rowNum) throws SQLException {
        OpportunitySummary opportunity = new OpportunitySummary();
        opportunity.setPubKey(rs.getString("PUB_KEY"));
        opportunity.setQuotePrice(rs.getBigDecimal("QUOTE_PRICE"));
        opportunity.setStatus(rs.getString("STATUS"));
        opportunity.setStatusPubKey(rs.getString("STATUS_PUB_KEY"));
        opportunity.setTitle(rs.getString("TITLE"));
        return opportunity;
    }
}
