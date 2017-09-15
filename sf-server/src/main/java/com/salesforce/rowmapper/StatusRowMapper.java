package com.salesforce.rowmapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import com.salesforce.model.Status;

/**
 * @author Arnab Kr Ghosh
 *
 */

public class StatusRowMapper implements RowMapper<Status> {
    public Status mapRow(ResultSet rs, int rowNum) throws SQLException {
        Status status = new Status();
        status.setPubKey(rs.getString("PUB_KEY"));
        status.setDes(rs.getString("DES"));
        status.setColor(rs.getString("COLOR"));
        return status;
    }
}
