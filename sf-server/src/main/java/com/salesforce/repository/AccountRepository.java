package com.salesforce.repository;

import java.util.List;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.apache.logging.log4j.Marker;
import org.apache.logging.log4j.MarkerManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import com.salesforce.model.Account;
import com.salesforce.model.AccountSummary;
import com.salesforce.model.ContactSummary;
import com.salesforce.model.ProductAccount;
import com.salesforce.rowmapper.AccountRowMapper;
import com.salesforce.rowmapper.AccountSummaryRowMapper;
import com.salesforce.rowmapper.ContactSummaryRowMapper;
import com.salesforce.rowmapper.ProductAccountRowMapper;

/**
 * @author Arnab Kr Ghosh
 *
 */

@Component
public class AccountRepository {

    private static final Logger logger = LogManager.getLogger(AccountRepository.class);
    private static final Marker sqlMarker = MarkerManager.getMarker("SQL");

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Value("${sql.account.page}")
    private String accountPageSql;

    @Value("${account.pagesize}")
    private Long accountPageSize;

    @Value("${sql.accountSummary.select}")
    private String accountSummarySelect;

    @Value("${sql.account.select}")
    private String accountSelect;

    @Value("${sql.accountContact.select}")
    private String accountContactSelect;

    @Value("${sql.accountProd.select}")
    private String accountProductSelect;

    public List<AccountSummary> getAccountPage(String searchString, long startPosition) {
        Object[] args = { searchString, '%' + searchString + '%', searchString, startPosition, accountPageSize };
        logger.info(sqlMarker, accountPageSql);
        logger.info(sqlMarker, "Params {}, {}, {}, {}, {}", () -> searchString, () -> '%' + searchString + '%', () -> searchString, () -> startPosition, () -> accountPageSize);
        List<AccountSummary> accounts = (List<AccountSummary>) jdbcTemplate.query(accountPageSql, args, new AccountSummaryRowMapper());
        logger.debug("Retrieved products: {}", () -> accounts);
        return accounts;
    }

    public AccountSummary getAccountSummary(String pubKey) {
        Object[] args = { pubKey };
        logger.info(sqlMarker, accountSelect);
        logger.info(sqlMarker, "Params {}", () -> pubKey);
        AccountSummary account = jdbcTemplate.queryForObject(accountSelect, args, new AccountSummaryRowMapper());
        logger.debug("Retrieved account: {}", () -> account);
        return account;

    }

    public Account getAccount(String pubKey) {
        Object[] args = { pubKey };
        logger.info(sqlMarker, accountSelect);
        logger.info(sqlMarker, "Params {}", () -> pubKey);
        Account account = jdbcTemplate.queryForObject(accountSelect, args, new AccountRowMapper());
        logger.info(sqlMarker, accountContactSelect);
        logger.info(sqlMarker, "Params {}", () -> pubKey);
        List<ContactSummary> accountContacts = jdbcTemplate.query(accountContactSelect, args, new ContactSummaryRowMapper());
        account.setContacts(accountContacts);
        logger.info(sqlMarker, accountProductSelect);
        logger.info(sqlMarker, "Params {}", () -> pubKey);
        List<ProductAccount> accountProducts = jdbcTemplate.query(accountProductSelect, args, new ProductAccountRowMapper());
        account.setProdAccount(accountProducts);
        logger.debug("Retrieved lead: {}", () -> account);
        return account;
    }

}
