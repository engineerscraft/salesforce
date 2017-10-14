package com.salesforce.rowmapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import com.salesforce.model.Opportunity;
import com.salesforce.model.OpportunitySummary;

public class OpportunityRowMapper implements RowMapper<Opportunity> {
    public Opportunity mapRow(ResultSet rs, int rowNum) throws SQLException {
        Opportunity opportunity = new Opportunity();
        opportunity.setOpportunitySummary(new OpportunitySummary());
        opportunity.getOpportunitySummary().setPubKey(rs.getString("PUB_KEY"));
        opportunity.getOpportunitySummary().setTitle(rs.getString("TITLE"));
        opportunity.getOpportunitySummary().setQuotePrice(rs.getBigDecimal("QUOTE_PRICE"));
        opportunity.getOpportunitySummary().setStatusPubKey(rs.getString("STATUS_PUB_KEY"));
        opportunity.getOpportunitySummary().setStatus(rs.getString("STATUS"));
        opportunity.setDiscType(rs.getInt("DISC_TYPE"));
        opportunity.setDiscVal(rs.getBigDecimal("DISC_VAL"));
        opportunity.setAccPubKey(rs.getString("ACC_PUB_KEY"));
        opportunity.setDivPubKey(rs.getString("DIV_PUB_KEY"));
        opportunity.setReadOnly("X".equals(rs.getString("RD_ONLY"))?true:false);
        return opportunity;
    }
}
