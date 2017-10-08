package com.salesforce.rowmapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import com.salesforce.model.Account;
import com.salesforce.model.AccountSummary;

/**
 * @author Arnab Kr Ghosh
 *
 */
public class AccountRowMapper implements RowMapper<Account> {
    public Account mapRow(ResultSet rs, int rowNum) throws SQLException {
        Account account = new Account();
        account.setAccountSummary(new AccountSummary());
        account.getAccountSummary().setPubKey(rs.getString("PUB_KEY"));
        account.getAccountSummary().setTitle(rs.getString("TITLE"));
        account.setStatusId(rs.getInt("STATUS_ID"));
        account.getAccountSummary().setSoldPrice(rs.getBigDecimal("SOLD_PRICE"));
        account.setDivPubKey(rs.getString("DIV_PUB_KEY"));
        return account;
    }
}
