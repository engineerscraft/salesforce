package com.salesforce.repository;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.List;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.apache.logging.log4j.Marker;
import org.apache.logging.log4j.MarkerManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.jdbc.core.BatchPreparedStatementSetter;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import com.salesforce.model.Account;
import com.salesforce.model.AccountSummary;
import com.salesforce.model.ContactSummary;
import com.salesforce.model.LeadSummary;
import com.salesforce.model.OpportunitySummary;
import com.salesforce.model.ProductAccount;
import com.salesforce.model.PublicKey;
import com.salesforce.rowmapper.AccountRowMapper;
import com.salesforce.rowmapper.AccountSummaryRowMapper;
import com.salesforce.rowmapper.ContactSummaryRowMapper;
import com.salesforce.rowmapper.LeadShortDesRowMapper;
import com.salesforce.rowmapper.OpportunityShortDesRowMapper;
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

    @Value("${sql.accountLead.select}")
    private String accountLeadSelect;

    @Value("${sql.accountOpportunity.select}")
    private String accountOpportunitySelect;

    @Value("${sql.account.update}")
    private String accountUpdate;

    @Value("${sql.accountContact.delete}")
    private String accountContactDelete;

    @Value("${sql.accountContact.insert}")
    private String accountContactInsert;

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
        logger.info(sqlMarker, accountLeadSelect);
        logger.info(sqlMarker, "Params {}", () -> pubKey);
        List<LeadSummary> accountLeads = jdbcTemplate.query(accountLeadSelect, args, new LeadShortDesRowMapper());
        account.setLeads(accountLeads);
        logger.info(sqlMarker, accountOpportunitySelect);
        logger.info(sqlMarker, "Params {}", () -> pubKey);
        List<OpportunitySummary> accountOpportunities = jdbcTemplate.query(accountOpportunitySelect, args, new OpportunityShortDesRowMapper());
        account.setOpportunities(accountOpportunities);
        logger.debug("Retrieved lead: {}", () -> account);
        return account;
    }

    public PublicKey modifyAccount(Account account, String username) throws Exception {
        if (account.getAccountSummary() != null) {
            logger.info(sqlMarker, accountUpdate);
            logger.info(sqlMarker, "Params {}, {}, {}, {}", () -> account.getAccountSummary().getTitle(), () -> account.getDivPubKey(), () -> username, () -> account.getAccountSummary().getPubKey());
            jdbcTemplate.update(accountUpdate, new Object[] { account.getAccountSummary().getTitle(), account.getDivPubKey(), username, account.getAccountSummary().getPubKey() });

            this.saveAccountContacts(account.getContacts(), account.getAccountSummary().getPubKey(), username, true);

            if (account.getChangeDes() != null) {
                // Comment comment = new Comment();
                // comment.setNote(lead.getChangeDes());
                // comment.setEntityPubKey(lead.getLeadSummary().getPubKey());
                // this.commentRepository.createComment(comment, username);
            }

            PublicKey pubKey = new PublicKey();
            pubKey.setPubKey(account.getAccountSummary().getPubKey());
            return pubKey;
        } else {
            throw new Exception("Account cannot be updated as basic account data is missing...");
        }
    }

    public void saveAccountContacts(final List<ContactSummary> contacts, String accountPubKey, String username, boolean delete) {
        final int batchSize = 500;

        if (delete) {
            logger.info(sqlMarker, accountContactDelete);
            logger.info(sqlMarker, "Params {}", () -> accountPubKey);
            jdbcTemplate.update(accountContactDelete, new Object[] { accountPubKey });
        }
        logger.info(sqlMarker, accountContactInsert);

        for (int j = 0; j < contacts.size(); j += batchSize) {

            final List<ContactSummary> batchList = contacts.subList(j, j + batchSize > contacts.size() ? contacts.size() : j + batchSize);

            jdbcTemplate.batchUpdate(accountContactInsert, new BatchPreparedStatementSetter() {
                @Override
                public void setValues(PreparedStatement ps, int i) throws SQLException {
                    logger.info(sqlMarker, "Params {}, {}, {}", () -> accountPubKey, () -> batchList.get(i), () -> username);
                    ContactSummary contact = batchList.get(i);
                    ps.setString(1, accountPubKey);
                    ps.setString(2, contact.getPubKey());
                    ps.setString(3, username);
                }

                @Override
                public int getBatchSize() {
                    return batchList.size();
                }
            });
        }
    }

}
