package com.salesforce.rowmapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import com.salesforce.model.SalesRep;

public class SalesRepRowMapper implements RowMapper<SalesRep> {
    public SalesRep mapRow(ResultSet rs, int rowNum) throws SQLException {
        SalesRep salesRep = new SalesRep();
        salesRep.setSalesRepId(rs.getInt("SALES_REP_ID"));
        salesRep.setPubKey(rs.getString("PUB_KEY"));
        salesRep.setfName(rs.getString("F_NAME"));
        salesRep.setmName(rs.getString("M_NAME"));
        salesRep.setlName(rs.getString("L_NAME"));
        salesRep.setSupPubKey(rs.getString("SUP_ID"));
        salesRep.setStatusId(rs.getInt("STATUS_ID"));
        salesRep.setEmail(rs.getString("EMAIL"));
        salesRep.setDoj(rs.getDate("DOJ"));
        salesRep.setDesig(rs.getString("DESIG"));
        salesRep.setMob(rs.getString("MOB"));
        salesRep.setLand(rs.getString("LAND"));
        salesRep.setExtn(rs.getString("EXTN"));
        return salesRep;
    }
}
