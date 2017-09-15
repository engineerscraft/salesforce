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
        country.setCountryId(rs.getInt("COUNTRY_ID"));
        country.setCountryName(rs.getString("COUNTRY_NAME"));
        return country;
    }
}
