package com.salesforce.rowmapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import com.salesforce.model.SalesRepSummary;

public class SalesRepSummaryRowMapper implements RowMapper<SalesRepSummary> {

    public SalesRepSummary mapRow(ResultSet rs, int rowNum) throws SQLException {
        SalesRepSummary salesRepSummary = new SalesRepSummary();
        salesRepSummary.setPubKey(rs.getString("PUB_KEY"));
        salesRepSummary.setfName(rs.getString("F_NAME"));
        salesRepSummary.setmName(rs.getString("M_NAME"));
        salesRepSummary.setlName(rs.getString("L_NAME"));
        salesRepSummary.setEmail(rs.getString("EMAIL"));
        salesRepSummary.setDesig(rs.getString("DESIG"));
        salesRepSummary.setMob(rs.getString("MOB"));
        salesRepSummary.setLand(rs.getString("LAND"));
        salesRepSummary.setExtn(rs.getString("EXTN"));
        return salesRepSummary;
    }
}
