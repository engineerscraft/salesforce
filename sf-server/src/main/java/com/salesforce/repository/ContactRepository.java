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

import com.salesforce.model.ContactSummary;
import com.salesforce.rowmapper.ContactSummaryRowMapper;

@Component
public class ContactRepository {
    private static final Logger logger = LogManager.getLogger(ContactRepository.class);
    private static final Marker sqlMarker = MarkerManager.getMarker("SQL");

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Value("${sql.contact.page}")
    private String contactPageSql;

    @Value("${contact.pagesize}")
    private Long contactPageSize;

    public List<ContactSummary> getContactPage(String searchString, long startPosition) {
        Object[] args = { searchString, '%'+searchString+'%', searchString, contactPageSize, startPosition };
        logger.info(sqlMarker, contactPageSql);
        logger.info(sqlMarker, "Params {}, {}, {}, {}, {}", () -> searchString, () -> '%'+searchString+'%', () -> searchString, () -> contactPageSize, () -> startPosition);
        List<ContactSummary> contacts = (List<ContactSummary>) jdbcTemplate.query(contactPageSql, args, new ContactSummaryRowMapper());
        logger.debug("Retrieved countries: {}", () -> contacts);
        return contacts;
    }

}
