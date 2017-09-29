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

import com.salesforce.model.AccountSummary;
import com.salesforce.rowmapper.AccountSummaryRowMapper;

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

    public List<AccountSummary> getAccountPage(String searchString, long startPosition) {
        Object[] args = { searchString, '%' + searchString + '%', searchString, startPosition, accountPageSize };
        logger.info(sqlMarker, accountPageSql);
        logger.info(sqlMarker, "Params {}, {}, {}, {}, {}", () -> searchString, () -> '%' + searchString + '%', () -> searchString, () -> startPosition, () -> accountPageSize);
        List<AccountSummary> accounts = (List<AccountSummary>) jdbcTemplate.query(accountPageSql, args, new AccountSummaryRowMapper());
        logger.debug("Retrieved products: {}", () -> accounts);
        return accounts;
    }

}
