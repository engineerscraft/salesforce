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
import org.springframework.transaction.annotation.Transactional;

import com.salesforce.model.ContactSummary;
import com.salesforce.model.Lead;
import com.salesforce.model.ProductInstance;
import com.salesforce.model.PublicKey;
import com.salesforce.rowmapper.ContactSummaryRowMapper;
import com.salesforce.rowmapper.LeadRowMapper;
import com.salesforce.rowmapper.ProductInstanceRowMapper;
import com.salesforce.utils.ApplicationUtils;

@Component
public class LeadRepository {

    private static final Logger logger = LogManager.getLogger(LeadRepository.class);
    private static final Marker sqlMarker = MarkerManager.getMarker("SQL");

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Value("${sql.getSeq.byName}")
    private String getLeadSequence;

    @Value("${sql.updateSeq.byName}")
    private String updateLeadSequence;

    @Value("${sql.leadTable.insert}")
    private String leadTableInsert;

    @Value("${sql.leadProductTable.insert}")
    private String leadProductTableInsert;

    @Value("${sql.leadContactTable.insert}")
    private String leadContactTableInsert;

    @Value("${sql.lead.select}")
    private String leadSelect;
    
    @Value("${sql.leadcontact.select}")
    private String leadContactSelect;
    
    @Value("${sql.leadprod.select}")
    private String leadProductSelect;
    
    @Transactional
    public PublicKey createLead(Lead lead, String username) throws Exception {
        Integer leadId = generateLeadId();
        if (lead.getLeadSummary() != null) {
            logger.info(sqlMarker, leadTableInsert);
            logger.info(sqlMarker, "Params {}, {}, {}, {}, {}, {}, {}, {}, {}", () -> leadId, () -> leadId, () -> lead.getAccPubKey(), () -> lead.getLeadSummary().getTitle(), () -> lead.getDiscType(), () -> lead.getDiscVal(),
                    () -> lead.getLeadSummary().getQuotePrice(), () -> lead.getDivPubKey(), () -> username);
            jdbcTemplate.update(leadTableInsert, new Object[] { leadId, leadId, lead.getAccPubKey(), lead.getLeadSummary().getTitle(), lead.getDiscType(), lead.getDiscVal(), lead.getLeadSummary().getQuotePrice(), lead.getDivPubKey(), username });
            logger.info(sqlMarker, leadContactTableInsert);
            this.saveLeadContacts(lead.getContacts(), leadId, username);
            logger.info(sqlMarker, leadProductTableInsert);
            this.saveLeadProducts(lead.getProdInstances(), leadId, username);
            PublicKey pubKey = new PublicKey();
            pubKey.setPubKey("CO" + String.format("%08d", leadId));
            return pubKey;
        } else {
            throw new Exception("Lead cannot be created as basic lead data is missing...");
        }
    }

    public void saveLeadContacts(final List<ContactSummary> contacts, int leadId, String username) {
        final int batchSize = 500;

        for (int j = 0; j < contacts.size(); j += batchSize) {

            final List<ContactSummary> batchList = contacts.subList(j, j + batchSize > contacts.size() ? contacts.size() : j + batchSize);

            jdbcTemplate.batchUpdate(leadContactTableInsert, new BatchPreparedStatementSetter() {
                @Override
                public void setValues(PreparedStatement ps, int i) throws SQLException {
                    logger.info(sqlMarker, "Params {}, {}, {}", () -> leadId, () -> batchList.get(i), () -> username);
                    ContactSummary contact = batchList.get(i);
                    ps.setInt(1, leadId);
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

    public void saveLeadProducts(final List<ProductInstance> productList, int leadId, String username) {
        final int batchSize = 500;

        for (int j = 0; j < productList.size(); j += batchSize) {

            final List<ProductInstance> batchList = productList.subList(j, j + batchSize > productList.size() ? productList.size() : j + batchSize);

            jdbcTemplate.batchUpdate(leadProductTableInsert, new BatchPreparedStatementSetter() {
                @Override
                public void setValues(PreparedStatement ps, int i) throws SQLException {
                    ProductInstance productInstance = batchList.get(i);
                    logger.info(sqlMarker, "Params {}, {}, {}, {}, {}, {}, {}, {}", () -> leadId, () -> productInstance.getPubKey(), () -> productInstance.getUnit(), () -> productInstance.getDiscType(), () -> productInstance.getDiscVal(), () -> productInstance.getQuotePrice(), () -> productInstance.getActualPrice(), () -> username);
                    ps.setInt(1, leadId);
                    ps.setString(2, productInstance.getPubKey());
                    ps.setInt(3, productInstance.getUnit());
                    ps.setInt(4, productInstance.getDiscType());
                    ps.setBigDecimal(5, productInstance.getDiscVal());
                    ps.setBigDecimal(6, productInstance.getQuotePrice());
                    ps.setBigDecimal(7, productInstance.getActualPrice());
                    ps.setString(8, username);
                }

                @Override
                public int getBatchSize() {
                    return batchList.size();
                }
            });
        }
    }

    private Integer generateLeadId() throws Exception {

        logger.info(sqlMarker, getLeadSequence);
        logger.info(sqlMarker, "Params {}", () -> ApplicationUtils.CONTACT_SEQ_NAME);

        Integer fetchedLeadId = jdbcTemplate.queryForObject(getLeadSequence, new Object[] { ApplicationUtils.LEAD_SEQ_NAME }, Integer.class);
        Integer newLeadId = fetchedLeadId + 1;

        logger.info(sqlMarker, updateLeadSequence);
        logger.info(sqlMarker, "Params {} {}", () -> newLeadId, () -> ApplicationUtils.CONTACT_SEQ_NAME);
        jdbcTemplate.update(updateLeadSequence, new Object[] { newLeadId, ApplicationUtils.CONTACT_SEQ_NAME });

        logger.debug("Lead ID generated: {}", () -> fetchedLeadId);
        return fetchedLeadId;
    }

    public Lead getLead(String pubKey) {
        Object[] args = { pubKey };
        logger.info(sqlMarker, leadSelect);
        logger.info(sqlMarker, "Params {}", () -> pubKey);
        Lead lead = jdbcTemplate.queryForObject(leadSelect, args, new LeadRowMapper());
        logger.info(sqlMarker, leadContactSelect);
        logger.info(sqlMarker, "Params {}", () -> pubKey);
        List<ContactSummary> leadContacts = jdbcTemplate.query(leadContactSelect, args, new ContactSummaryRowMapper());
        lead.setContacts(leadContacts);
        logger.info(sqlMarker, leadProductSelect);
        logger.info(sqlMarker, "Params {}", () -> pubKey);
        List<ProductInstance> leadProducts = jdbcTemplate.query(leadProductSelect, args, new ProductInstanceRowMapper());
        lead.setProdInstances(leadProducts);        
        logger.debug("Retrieved lead: {}", () -> lead);
        return lead;
    }
}
