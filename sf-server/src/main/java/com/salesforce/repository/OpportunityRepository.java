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
import com.salesforce.model.Opportunity;
import com.salesforce.model.OpportunitySummary;
import com.salesforce.model.ProductInstance;
import com.salesforce.model.PublicKey;
import com.salesforce.rowmapper.ContactSummaryRowMapper;
import com.salesforce.rowmapper.OpportunityRowMapper;
import com.salesforce.rowmapper.OpportunitySummaryRowMapper;
import com.salesforce.rowmapper.ProductInstanceRowMapper;
import com.salesforce.utils.ApplicationUtils;

@Component
public class OpportunityRepository {

    private static final Logger logger = LogManager.getLogger(OpportunityRepository.class);
    private static final Marker sqlMarker = MarkerManager.getMarker("SQL");

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Value("${sql.getSeq.byName}")
    private String getOpportunitySequence;

    @Value("${sql.updateSeq.byName}")
    private String updateOppSequence;

    @Value("${sql.opportunity.insert}")
    private String oppTableInsert;

    @Value("${sql.oppProdFromLead.insert}")
    private String oppProdFromLead;

    @Value("${sql.oppContactFromLead.insert}")
    private String oppContactFromLead;

    @Value("${sql.leadlock.update}")
    private String leadLockSql;

    @Value("${sql.opportunity.update}")
    private String oppUpdate;

    @Value("${sql.oppStatus.select}")
    private String oppStatusQuery;
    
    @Value("${sql.oppProd.delete}")
    private String oppProdDelete;
    
    @Value("${sql.oppProductTable.insert}")
    private String oppProductTableInsert;
    
    @Value("${sql.oppContact.delete}")
    private String oppContactDelete;
    
    @Value("${sql.oppContactTable.insert}")
    private String oppContactTableInsert;
    
    @Value("${opportunity.pagesize}")
    private int oppPageSize;
    
    @Value("${sql.opportunity.page}")
    private String oppPageSql;
    
    @Value("${sql.opportunity.select}")
    private String oppSelect;
    
    @Value("${sql.oppContact.select}")
    private String oppContactSelect;

    @Value("${sql.oppProd.select}")
    private String oppProductSelect;

    @Autowired
    private CommentRepository commentRepository;

    @Transactional
    public PublicKey createOpportunity(PublicKey leadPubKey, String username) throws Exception {
        Integer opportunityId = generateOpportunityId();
        PublicKey pubKey = new PublicKey();
        pubKey.setPubKey("OP" + String.format("%08d", opportunityId));

        logger.info(sqlMarker, oppTableInsert);
        logger.info(sqlMarker, "Params {}, {}, {}", () -> opportunityId, () -> pubKey.getPubKey(), () -> username);
        jdbcTemplate.update(oppTableInsert, new Object[] { opportunityId, pubKey.getPubKey(), username });
        logger.info(sqlMarker, oppContactFromLead);
        jdbcTemplate.update(oppContactFromLead, new Object[] { opportunityId, username });
        logger.info(sqlMarker, oppProdFromLead);
        jdbcTemplate.update(oppProdFromLead, new Object[] { opportunityId, username });
        logger.info(sqlMarker, leadLockSql);
        jdbcTemplate.update(leadLockSql, new Object[] { leadPubKey.getPubKey() });
        Comment comment = new Comment();
        comment.setNote("Opportunity created");
        comment.setEntityPubKey(pubKey.getPubKey());
        this.commentRepository.createInitialComment(comment, username);
        return pubKey;
    }

    private Integer generateOpportunityId() throws Exception {

        logger.info(sqlMarker, getOpportunitySequence);
        logger.info(sqlMarker, "Params {}", () -> ApplicationUtils.OPPORTUNITY_SEQ_NAME);

        Integer fetchedOpportunityId = jdbcTemplate.queryForObject(getOpportunitySequence, new Object[] { ApplicationUtils.OPPORTUNITY_SEQ_NAME }, Integer.class);
        Integer newOpportunityId = fetchedOpportunityId + 1;

        logger.info(sqlMarker, updateOppSequence);
        logger.info(sqlMarker, "Params {} {}", () -> newOpportunityId, () -> ApplicationUtils.OPPORTUNITY_SEQ_NAME);
        jdbcTemplate.update(updateOppSequence, new Object[] { newOpportunityId, ApplicationUtils.OPPORTUNITY_SEQ_NAME });

        logger.debug("Opportunity ID generated: {}", () -> fetchedOpportunityId);
        return fetchedOpportunityId;
    }

    public PublicKey modifyOpportunity(Opportunity opportunity, String username) throws Exception {
        if (opportunity.getOpportunitySummary() != null) {
            String currentStatus = getCurrentStatus(opportunity.getOpportunitySummary().getPubKey());
            logger.info(sqlMarker, oppUpdate);
            logger.info(sqlMarker, "Params {}, {}, {}, {}, {}, {}, {}, {}, {}", () -> opportunity.getAccPubKey(), () -> opportunity.getOpportunitySummary().getTitle(), () -> opportunity.getDiscType(), () -> opportunity.getDiscVal(),
                    () -> opportunity.getOpportunitySummary().getQuotePrice(), () -> opportunity.getOpportunitySummary().getStatusPubKey(), () -> opportunity.getDivPubKey(), () -> username, () -> opportunity.getOpportunitySummary().getPubKey());
            jdbcTemplate.update(oppUpdate, new Object[] { opportunity.getAccPubKey(), opportunity.getOpportunitySummary().getTitle(), opportunity.getDiscType(), opportunity.getDiscVal(), opportunity.getOpportunitySummary().getQuotePrice(),
                    opportunity.getOpportunitySummary().getStatusPubKey(), opportunity.getDivPubKey(), username, opportunity.getOpportunitySummary().getPubKey() });

            this.saveOppContacts(opportunity.getContacts(), opportunity.getOpportunitySummary().getPubKey(), username, true);

            this.saveOppProducts(opportunity.getProdInstances(), opportunity.getOpportunitySummary().getPubKey(), username, true);

            if (!currentStatus.equals(opportunity.getOpportunitySummary().getStatusPubKey())) {
                Comment comment = new Comment();
                comment.setNote("Status changed");
                comment.setEntityPubKey(opportunity.getOpportunitySummary().getPubKey());
                comment.setStatusPubKey(opportunity.getOpportunitySummary().getStatusPubKey());
                this.commentRepository.createComment(comment, username);
            }

            if (opportunity.getChangeDes() != null) {
                Comment comment = new Comment();
                comment.setNote(opportunity.getChangeDes());
                comment.setEntityPubKey(opportunity.getOpportunitySummary().getPubKey());
                this.commentRepository.createComment(comment, username);
            }

            PublicKey pubKey = new PublicKey();
            pubKey.setPubKey(opportunity.getOpportunitySummary().getPubKey());
            return pubKey;
        } else {
            throw new Exception("Opportunity cannot be updated as basic opportunity data is missing...");
        }
    }

    private void saveOppProducts(List<ProductInstance> productList, String pubKey, String username, boolean delete) {
        final int batchSize = 500;

        if (delete) {

            logger.info(sqlMarker, oppProdDelete);
            logger.info(sqlMarker, "Params {}", () -> pubKey);
            jdbcTemplate.update(oppProdDelete, new Object[] { pubKey });
        }

        logger.info(sqlMarker, oppProductTableInsert);

        for (int j = 0; j < productList.size(); j += batchSize) {

            final List<ProductInstance> batchList = productList.subList(j, j + batchSize > productList.size() ? productList.size() : j + batchSize);

            jdbcTemplate.batchUpdate(oppProductTableInsert, new BatchPreparedStatementSetter() {
                @Override
                public void setValues(PreparedStatement ps, int i) throws SQLException {
                    ProductInstance productInstance = batchList.get(i);
                    logger.info(sqlMarker, "Params {}, {}, {}, {}, {}, {}, {}, {}", () -> pubKey, () -> productInstance.getPubKey(), () -> productInstance.getUnit(), () -> productInstance.getDiscType(), () -> productInstance.getDiscVal(),
                            () -> productInstance.getQuotePrice(), () -> productInstance.getActualPrice(), () -> username);
                    ps.setString(1, pubKey);
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

    private void saveOppContacts(List<ContactSummary> contacts, String pubKey, String username, boolean delete) {
        final int batchSize = 500;

        if (delete) {
            logger.info(sqlMarker, oppContactDelete);
            logger.info(sqlMarker, "Params {}", () -> pubKey);
            jdbcTemplate.update(oppContactDelete, new Object[] { pubKey });
        }
        logger.info(sqlMarker, oppContactTableInsert);

        for (int j = 0; j < contacts.size(); j += batchSize) {

            final List<ContactSummary> batchList = contacts.subList(j, j + batchSize > contacts.size() ? contacts.size() : j + batchSize);

            jdbcTemplate.batchUpdate(oppContactTableInsert, new BatchPreparedStatementSetter() {
                @Override
                public void setValues(PreparedStatement ps, int i) throws SQLException {
                    logger.info(sqlMarker, "Params {}, {}, {}", () -> pubKey, () -> batchList.get(i), () -> username);
                    ContactSummary contact = batchList.get(i);
                    ps.setString(1, pubKey);
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

    private String getCurrentStatus(String pubKey) {
        logger.info(sqlMarker, oppStatusQuery);
        logger.info(sqlMarker, "Params {}", () -> pubKey);
        String statusPubKey = jdbcTemplate.queryForObject(oppStatusQuery, new Object[] { pubKey }, new RowMapper<String>() {
            public String mapRow(ResultSet rs, int rowNum) throws SQLException {
                return rs.getString("PUB_KEY");
            }
        });
        return statusPubKey;
    }

    public Opportunity getOpportunity(String pubKey) {
        Object[] args = { pubKey };
        logger.info(sqlMarker, oppSelect);
        logger.info(sqlMarker, "Params {}", () -> pubKey);
        Opportunity opportunity = jdbcTemplate.queryForObject(oppSelect, args, new OpportunityRowMapper());
        logger.info(sqlMarker, oppContactSelect);
        logger.info(sqlMarker, "Params {}", () -> pubKey);
        List<ContactSummary> oppContacts = jdbcTemplate.query(oppContactSelect, args, new ContactSummaryRowMapper());
        opportunity.setContacts(oppContacts);
        logger.info(sqlMarker, oppProductSelect);
        logger.info(sqlMarker, "Params {}", () -> pubKey);
        List<ProductInstance> oppProducts = jdbcTemplate.query(oppProductSelect, args, new ProductInstanceRowMapper());
        opportunity.setProdInstances(oppProducts);
        logger.debug("Retrieved opporttunity: {}", () -> opportunity);
        return opportunity;
    }

    public List<OpportunitySummary> getOpportunityPage(String searchString, long startPosition) {
        Object[] args = { searchString, '%' + searchString + '%', searchString, startPosition, oppPageSize };
        logger.info(sqlMarker, oppPageSql);
        logger.info(sqlMarker, "Params {}, {}, {}, {}, {}", () -> searchString, () -> '%' + searchString + '%', () -> searchString, () -> startPosition, () -> oppPageSize);
        List<OpportunitySummary> opportunities = (List<OpportunitySummary>) jdbcTemplate.query(oppPageSql, args, new OpportunitySummaryRowMapper());
        logger.debug("Retrieved opportunities: {}", () -> opportunities);
        return opportunities;
    }
}
