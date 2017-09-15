/**
 * 
 */
package com.salesforce.rowmapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import com.salesforce.model.Country;

/**
 * @author Arnab Kr Ghosh
 *
 */

public class CountryRowMapper implements RowMapper<Country> {

    public Country mapRow(ResultSet rs, int rowNum) throws SQLException {
        Country country = new Country();
        country.setcId(rs.getInt("C_ID"));
        country.setcName(rs.getString("C_NAME"));
        return country;
    }
}
