/**
 * 
 */
package com.salesforce.repository;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.apache.logging.log4j.Marker;
import org.apache.logging.log4j.MarkerManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import com.salesforce.model.Count;

/**
 * @author Arnab Kr Ghosh
 *
 */

@Component
public class CountRepository {

    private static final Logger logger = LogManager.getLogger(CountRepository.class);
    private static final Marker sqlMarker = MarkerManager.getMarker("SQL");

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Value("${sql.account.count}")
    private String accountCountSql;

    @Value("${sql.lead.count}")
    private String leadCountSql;

    @Value("${sql.opportunity.count}")
    private String opportunityCountSql;

    @Value("${sql.contact.count}")
    private String contactCountSql;

    public Count getAllCounts() {

        Count count = new Count();
        logger.info(sqlMarker, accountCountSql);
        count.setAccountCount(jdbcTemplate.queryForObject(accountCountSql, Integer.class));
        logger.info(sqlMarker, leadCountSql);
        count.setLeadCount(jdbcTemplate.queryForObject(leadCountSql, Integer.class));
        logger.info(sqlMarker, opportunityCountSql);
        count.setOpportunityCount(jdbcTemplate.queryForObject(opportunityCountSql, Integer.class));
        logger.info(sqlMarker, contactCountSql);
        count.setContactCount(jdbcTemplate.queryForObject(contactCountSql, Integer.class));
        logger.debug("Retrieved count: {}", () -> count);
        return count;

    }

}
