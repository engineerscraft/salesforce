package com.salesforce.rowmapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import com.salesforce.model.State;

/**
 * @author Arnab Kr Ghosh
 *
 */

public class StateRowMapper implements RowMapper<State> {
    public State mapRow(ResultSet rs, int rowNum) throws SQLException {
        State state = new State();
        state.setsId(rs.getInt("S_ID"));
        state.setsName(rs.getString("S_NAME"));
        return state;
    }
}
