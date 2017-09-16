/**
 * 
 */
package com.salesforce.rowmapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import com.salesforce.model.Division;

/**
 * @author Arnab Kr Ghosh
 *
 */

public class DivisionRowMapper implements RowMapper<Division> {

    public Division mapRow(ResultSet rs, int rowNum) throws SQLException {
        Division division = new Division();
        division.setDivId(rs.getInt("DIV_ID"));
        division.setPubKey(rs.getString("PUB_KEY"));
        division.setDes(rs.getString("DES"));
        return division;
    }
}
