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
import org.springframework.transaction.annotation.Transactional;

import com.salesforce.model.PublicKey;
import com.salesforce.model.SalesRep;
import com.salesforce.model.SalesRepSummary;
import com.salesforce.rowmapper.SalesRepRowMapper;
import com.salesforce.rowmapper.SalesRepSummaryRowMapper;
import com.salesforce.utils.ApplicationUtils;

/**
 * @author earngho
 *
 */
@Component
public class SalesRepRepository {
    private static final Logger logger = LogManager.getLogger(SalesRepRepository.class);
    private static final Marker sqlMarker = MarkerManager.getMarker("SQL");

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Autowired
    private AuthenticationRepository authRepo;

    @Value("${sql.salesRep.page}")
    private String salesRepPageSql;

    @Value("${salesRep.pagesize}")
    private Long salesRepPageSize;

    @Value("${sql.getSeq.byName}")
    private String getSalesRepSequence;

    @Value("${sql.updateSeq.byName}")
    private String updateSalesRepSequence;

    @Value("${sql.salesRepTable.insert}")
    private String salesRepTableInsert;

    @Value("${sql.salesRep.select}")
    private String salesRepSelect;

    @Value("${sql.salesRep.summary.select}")
    private String salesRepSummarySelect;

    @Value("${sql.salesRep.update}")
    private String salesRepUpdate;

    public List<SalesRepSummary> getSalesRepPage(String searchString, long startPosition) {
        Object[] args = { searchString, '%' + searchString + '%', searchString, salesRepPageSize, startPosition };
        logger.info(sqlMarker, salesRepPageSql);
        logger.info(sqlMarker, "Params {}, {}, {}, {}, {}", () -> searchString, () -> '%' + searchString + '%', () -> searchString, () -> salesRepPageSize, () -> startPosition);
        List<SalesRepSummary> salesReps = (List<SalesRepSummary>) jdbcTemplate.query(salesRepPageSql, args, new SalesRepSummaryRowMapper());
        logger.debug("Retrieved sales representatives: {}", () -> salesReps);
        return salesReps;
    }

    /**
     * @param salesRep
     * @param username
     * @return
     * @throws Exception
     */
    @Transactional
    public PublicKey createSalesRep(SalesRep salesRep, String username) throws Exception {
        if (salesRep != null) {
            Integer salesRepId = generateSalesRepId();

            logger.info(sqlMarker, salesRepTableInsert);
            logger.info(sqlMarker, "Params {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}", () -> salesRepId, () -> salesRepId, () -> salesRep.getSalesRepSummary().getfName(), () -> salesRep.getSalesRepSummary().getmName(),
                    () -> salesRep.getSalesRepSummary().getlName(), () -> salesRep.getSupPubKey(), () -> salesRep.getStatusId(), () -> salesRep.getSalesRepSummary().getExtn(), () -> salesRep.getSalesRepSummary().getLand(),
                    () -> salesRep.getSalesRepSummary().getMob(), () -> salesRep.getSalesRepSummary().getEmail(), () -> salesRep.getDoj(), () -> salesRep.getSalesRepSummary().getDesig(), () -> username);
            jdbcTemplate.update(salesRepTableInsert,
                    new Object[] { salesRepId, salesRepId, salesRep.getSalesRepSummary().getfName(), salesRep.getSalesRepSummary().getmName(), salesRep.getSalesRepSummary().getlName(), salesRep.getSupPubKey(), salesRep.getStatusId(),
                            salesRep.getSalesRepSummary().getExtn(), salesRep.getSalesRepSummary().getLand(), salesRep.getSalesRepSummary().getMob(), salesRep.getSalesRepSummary().getEmail(), salesRep.getDoj(), salesRep.getSalesRepSummary().getDesig(),
                            username });

            PublicKey pubKey = new PublicKey();
            pubKey.setPubKey("SR" + String.format("%08d", salesRepId));

            // create LDAP user
            authRepo.createUser(pubKey.getPubKey(), salesRep);

            return pubKey;
        } else {
            throw new Exception("Sales Representative cannot be created as data is missing...");
        }
    }

    /**
     * @return
     * @throws Exception
     */
    private Integer generateSalesRepId() throws Exception {

        logger.info(sqlMarker, getSalesRepSequence);
        logger.info(sqlMarker, "Params {}", () -> ApplicationUtils.SALES_REP_SEQ_NAME);

        Integer fetchedSalesRepId = jdbcTemplate.queryForObject(getSalesRepSequence, new Object[] { ApplicationUtils.SALES_REP_SEQ_NAME }, Integer.class);
        Integer newSalesRepId = fetchedSalesRepId + 1;

        logger.info(sqlMarker, updateSalesRepSequence);
        logger.info(sqlMarker, "Params {} {}", () -> newSalesRepId, () -> ApplicationUtils.SALES_REP_SEQ_NAME);
        jdbcTemplate.update(updateSalesRepSequence, new Object[] { newSalesRepId, ApplicationUtils.SALES_REP_SEQ_NAME });

        logger.debug("Sales Representative ID generated: {}", () -> fetchedSalesRepId);
        return fetchedSalesRepId;
    }

    public SalesRepSummary getSalesRepSummary(String pubKey) {
        Object[] args = { pubKey };
        logger.info(sqlMarker, salesRepSummarySelect);
        logger.info(sqlMarker, "Params {}", () -> pubKey);
        SalesRepSummary salesRepSummary = jdbcTemplate.queryForObject(salesRepSummarySelect, args, new SalesRepSummaryRowMapper());
        logger.debug("Retrieved account: {}", () -> salesRepSummary);
        return salesRepSummary;

    }

    public SalesRep getSalesRep(String pubKey) {
        Object[] args = { pubKey };
        logger.info(sqlMarker, salesRepSelect);
        logger.info(sqlMarker, "Params {}", () -> pubKey);
        SalesRep salesRep = jdbcTemplate.queryForObject(salesRepSelect, args, new SalesRepRowMapper());
        logger.debug("Retrieved Sales Representative: {}", () -> salesRep);
        return salesRep;
    }

    @Transactional
    public PublicKey updateSalesRep(String pubKey, SalesRep salesRep, String username) throws Exception {
        if (salesRep != null) {
            logger.info(sqlMarker, salesRepUpdate);
            logger.info(sqlMarker, "Params {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}", () -> salesRep.getSalesRepSummary().getfName(), () -> salesRep.getSalesRepSummary().getmName(), () -> salesRep.getSalesRepSummary().getlName(),
                    () -> salesRep.getSupPubKey(), () -> salesRep.getStatusId(), () -> salesRep.getSalesRepSummary().getExtn(), () -> salesRep.getSalesRepSummary().getLand(), () -> salesRep.getSalesRepSummary().getMob(),
                    () -> salesRep.getSalesRepSummary().getEmail(), () -> salesRep.getDoj(), () -> salesRep.getSalesRepSummary().getDesig(), () -> username, () -> pubKey);
            jdbcTemplate.update(salesRepUpdate,
                    new Object[] { salesRep.getSalesRepSummary().getfName(), salesRep.getSalesRepSummary().getmName(), salesRep.getSalesRepSummary().getlName(), salesRep.getSupPubKey(), salesRep.getStatusId(), salesRep.getSalesRepSummary().getExtn(),
                            salesRep.getSalesRepSummary().getLand(), salesRep.getSalesRepSummary().getMob(), salesRep.getSalesRepSummary().getEmail(), salesRep.getDoj(), salesRep.getSalesRepSummary().getDesig(), username, pubKey });

            PublicKey pubKeyObj = new PublicKey();
            pubKeyObj.setPubKey(pubKey);
            return pubKeyObj;
        } else {
            throw new Exception("Sales Representative cannot be modified as data is missing...");
        }
    }

}
