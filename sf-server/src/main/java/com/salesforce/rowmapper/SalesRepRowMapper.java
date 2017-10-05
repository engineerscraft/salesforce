package com.salesforce.rowmapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import com.salesforce.model.SalesRep;
import com.salesforce.model.SalesRepSummary;

public class SalesRepRowMapper implements RowMapper<SalesRep> {

    public SalesRep mapRow(ResultSet rs, int rowNum) throws SQLException {
        SalesRep salesRep = new SalesRep();
        salesRep.setSalesRepSummary(new SalesRepSummary());
        salesRep.getSalesRepSummary().setSalesRepId(rs.getInt("SALES_REP_ID"));
        salesRep.getSalesRepSummary().setPubKey(rs.getString("PUB_KEY"));
        salesRep.getSalesRepSummary().setfName(rs.getString("F_NAME"));
        salesRep.getSalesRepSummary().setmName(rs.getString("M_NAME"));
        salesRep.getSalesRepSummary().setlName(rs.getString("L_NAME"));
        salesRep.setStatusId(rs.getInt("STATUS_ID"));
        salesRep.getSalesRepSummary().setEmail(rs.getString("EMAIL"));
        salesRep.setDoj(rs.getDate("DOJ"));
        salesRep.getSalesRepSummary().setDesig(rs.getString("DESIG"));
        salesRep.getSalesRepSummary().setMob(rs.getString("MOB"));
        salesRep.getSalesRepSummary().setLand(rs.getString("LAND"));
        salesRep.getSalesRepSummary().setExtn(rs.getString("EXTN"));
        salesRep.setSupPubKey(rs.getString("SUP_PUB_KEY"));
        return salesRep;
    }
}
