/**
 * 
 */
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
        state.setStateId(rs.getInt("STATE_ID"));
        state.setStateName(rs.getString("STATE_NAME"));
        ;
        state.setCountryId(rs.getInt("COUNTRY_ID"));
        state.setCountryName(rs.getString("COUNTRY_NAME"));
        return state;
    }
}
