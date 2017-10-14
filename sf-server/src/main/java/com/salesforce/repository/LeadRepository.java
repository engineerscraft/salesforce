package com.salesforce.repository;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
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
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.salesforce.model.Comment;
import com.salesforce.model.ContactSummary;
import com.salesforce.model.Lead;
import com.salesforce.model.LeadSummary;
import com.salesforce.model.ProductInstance;
import com.salesforce.model.PublicKey;
import com.salesforce.rowmapper.ContactSummaryRowMapper;
import com.salesforce.rowmapper.LeadRowMapper;
import com.salesforce.rowmapper.LeadSummaryRowMapper;
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

    @Value("${sql.lead.update}")
    private String leadUpdate;

    @Value("${sql.leadcontact.delete}")
    private String leadContactDelete;

    @Value("${sql.leadprod.delete}")
    private String leadProdDelete;

    @Value("${sql.leadstatus.select}")
    private String leadStatusQuery;

    @Value("${sql.lead.page}")
    private String leadPageSql;

    @Value("${lead.pagesize}")
    private Long leadPageSize;

    @Autowired
    private CommentRepository commentRepository;

    @Transactional
    public PublicKey createLead(Lead lead, String username) throws Exception {
        Integer leadId = generateLeadId();
        if (lead.getLeadSummary() != null) {
            logger.info(sqlMarker, leadTableInsert);
            logger.info(sqlMarker, "Params {}, {}, {}, {}, {}, {}, {}, {}, {}", () -> leadId, () -> leadId, () -> lead.getAccPubKey(), () -> lead.getLeadSummary().getTitle(), () -> lead.getDiscType(), () -> lead.getDiscVal(),
                    () -> lead.getLeadSummary().getQuotePrice(), () -> lead.getDivPubKey(), () -> username);
            jdbcTemplate.update(leadTableInsert, new Object[] { leadId, leadId, lead.getAccPubKey(), lead.getLeadSummary().getTitle(), lead.getDiscType(), lead.getDiscVal(), lead.getLeadSummary().getQuotePrice(), lead.getDivPubKey(), username });
            PublicKey pubKey = new PublicKey();
            pubKey.setPubKey("LD" + String.format("%08d", leadId));
            logger.info(sqlMarker, leadContactTableInsert);
            this.saveLeadContacts(lead.getContacts(), pubKey.getPubKey(), username, false);
            logger.info(sqlMarker, leadProductTableInsert);
            this.saveLeadProducts(lead.getProdInstances(), pubKey.getPubKey(), username, false);
            Comment comment = new Comment();
            comment.setNote("Lead created");
            comment.setEntityPubKey(pubKey.getPubKey());
            this.commentRepository.createInitialComment(comment, username);
            return pubKey;
        } else {
            throw new Exception("Lead cannot be created as basic lead data is missing...");
        }
    }

    public void saveLeadContacts(final List<ContactSummary> contacts, String leadPubKey, String username, boolean delete) {
        final int batchSize = 500;

        if (delete) {
            logger.info(sqlMarker, leadContactDelete);
            logger.info(sqlMarker, "Params {}", () -> leadPubKey);
            jdbcTemplate.update(leadContactDelete, new Object[] { leadPubKey });
        }
        logger.info(sqlMarker, leadContactTableInsert);

        for (int j = 0; j < contacts.size(); j += batchSize) {

            final List<ContactSummary> batchList = contacts.subList(j, j + batchSize > contacts.size() ? contacts.size() : j + batchSize);

            jdbcTemplate.batchUpdate(leadContactTableInsert, new BatchPreparedStatementSetter() {
                @Override
                public void setValues(PreparedStatement ps, int i) throws SQLException {
                    logger.info(sqlMarker, "Params {}, {}, {}", () -> leadPubKey, () -> batchList.get(i), () -> username);
                    ContactSummary contact = batchList.get(i);
                    ps.setString(1, leadPubKey);
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

    public void saveLeadProducts(final List<ProductInstance> productList, String leadPubKey, String username, boolean delete) {
        final int batchSize = 500;

        if (delete) {

            logger.info(sqlMarker, leadProdDelete);
            logger.info(sqlMarker, "Params {}", () -> leadPubKey);
            jdbcTemplate.update(leadProdDelete, new Object[] { leadPubKey });
        }

        logger.info(sqlMarker, leadProductTableInsert);

        for (int j = 0; j < productList.size(); j += batchSize) {

            final List<ProductInstance> batchList = productList.subList(j, j + batchSize > productList.size() ? productList.size() : j + batchSize);

            jdbcTemplate.batchUpdate(leadProductTableInsert, new BatchPreparedStatementSetter() {
                @Override
                public void setValues(PreparedStatement ps, int i) throws SQLException {
                    ProductInstance productInstance = batchList.get(i);
                    logger.info(sqlMarker, "Params {}, {}, {}, {}, {}, {}, {}, {}", () -> leadPubKey, () -> productInstance.getPubKey(), () -> productInstance.getUnit(), () -> productInstance.getDiscType(), () -> productInstance.getDiscVal(),
                            () -> productInstance.getQuotePrice(), () -> productInstance.getActualPrice(), () -> username);
                    ps.setString(1, leadPubKey);
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
        logger.info(sqlMarker, "Params {}", () -> ApplicationUtils.LEAD_SEQ_NAME);

        Integer fetchedLeadId = jdbcTemplate.queryForObject(getLeadSequence, new Object[] { ApplicationUtils.LEAD_SEQ_NAME }, Integer.class);
        Integer newLeadId = fetchedLeadId + 1;

        logger.info(sqlMarker, updateLeadSequence);
        logger.info(sqlMarker, "Params {} {}", () -> newLeadId, () -> ApplicationUtils.LEAD_SEQ_NAME);
        jdbcTemplate.update(updateLeadSequence, new Object[] { newLeadId, ApplicationUtils.LEAD_SEQ_NAME });

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

    public PublicKey modifyLead(Lead lead, String username) throws Exception {
        if (lead.getLeadSummary() != null) {
            String currentStatus = getCurrentStatus(lead.getLeadSummary().getPubKey());
            logger.info(sqlMarker, leadUpdate);
            logger.info(sqlMarker, "Params {}, {}, {}, {}, {}, {}, {}, {}, {}", () -> lead.getAccPubKey(), () -> lead.getLeadSummary().getTitle(), () -> lead.getDiscType(), () -> lead.getDiscVal(), () -> lead.getLeadSummary().getQuotePrice(),
                    () -> lead.getLeadSummary().getStatusPubKey(), () -> lead.getDivPubKey(), () -> username, () -> lead.getLeadSummary().getPubKey());
            jdbcTemplate.update(leadUpdate, new Object[] { lead.getAccPubKey(), lead.getLeadSummary().getTitle(), lead.getDiscType(), lead.getDiscVal(), lead.getLeadSummary().getQuotePrice(), lead.getLeadSummary().getStatusPubKey(), lead.getDivPubKey(),
                    username, lead.getLeadSummary().getPubKey() });

            this.saveLeadContacts(lead.getContacts(), lead.getLeadSummary().getPubKey(), username, true);

            this.saveLeadProducts(lead.getProdInstances(), lead.getLeadSummary().getPubKey(), username, true);

            if (!currentStatus.equals(lead.getLeadSummary().getStatusPubKey())) {
                Comment comment = new Comment();
                comment.setNote("Status changed");
                comment.setEntityPubKey(lead.getLeadSummary().getPubKey());
                comment.setStatusPubKey(lead.getLeadSummary().getStatusPubKey());
                this.commentRepository.createComment(comment, username);
            }

            if (lead.getChangeDes() != null) {
                Comment comment = new Comment();
                comment.setNote(lead.getChangeDes());
                comment.setEntityPubKey(lead.getLeadSummary().getPubKey());
                this.commentRepository.createComment(comment, username);
            }

            PublicKey pubKey = new PublicKey();
            pubKey.setPubKey(lead.getLeadSummary().getPubKey());
            return pubKey;
        } else {
            throw new Exception("Lead cannot be updated as basic lead data is missing...");
        }
    }

    public String getCurrentStatus(String pubKey) {
        logger.info(sqlMarker, leadStatusQuery);
        logger.info(sqlMarker, "Params {}", () -> pubKey);
        String statusPubKey = jdbcTemplate.queryForObject(leadStatusQuery, new Object[] { pubKey }, new RowMapper<String>() {
            public String mapRow(ResultSet rs, int rowNum) throws SQLException {
                return rs.getString("PUB_KEY");
            }
        });
        return statusPubKey;
    }

    public List<LeadSummary> getLeadPage(String searchString, long startPosition) {
        Object[] args = { searchString, '%' + searchString + '%', searchString, startPosition, leadPageSize };
        logger.info(sqlMarker, leadPageSql);
        logger.info(sqlMarker, "Params {}, {}, {}, {}, {}", () -> searchString, () -> '%' + searchString + '%', () -> searchString, () -> startPosition, () -> leadPageSize);
        List<LeadSummary> leads = (List<LeadSummary>) jdbcTemplate.query(leadPageSql, args, new LeadSummaryRowMapper());
        logger.debug("Retrieved leads: {}", () -> leads);
        return leads;
    }
}
