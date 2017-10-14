package com.salesforce.rowmapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import com.salesforce.model.AccountSummary;

/**
 * @author Arnab Kr Ghosh
 *
 */

public class AccountSummaryRowMapper implements RowMapper<AccountSummary> {

    public AccountSummary mapRow(ResultSet rs, int rowNum) throws SQLException {
        AccountSummary account = new AccountSummary();
        account.setPubKey(rs.getString("PUB_KEY"));
        account.setTitle(rs.getString("TITLE"));
        account.setSoldPrice(rs.getBigDecimal("SOLD_PRICE"));
        return account;
    }
}
