package com.salesforce.rowmapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import com.salesforce.model.District;

/**
 * @author Arnab Kr Ghosh
 *
 */

public class DistrictRowMapper implements RowMapper<District> {
    public District mapRow(ResultSet rs, int rowNum) throws SQLException {
        District district = new District();
        district.setdId(rs.getInt("D_ID"));
        district.setdName(rs.getString("D_NAME"));
        return district;
    }
}
