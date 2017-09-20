package com.salesforce.repository;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.apache.logging.log4j.Marker;
import org.apache.logging.log4j.MarkerManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.salesforce.model.SalesRep;
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

    @Value("${sql.getSeq.byName}")
    private String getSalesRepSequence;

    @Value("${sql.updateSeq.byName}")
    private String updateSalesRepSequence;

    @Value("${sql.salesRepTable.insert}")
    private String salesRepTableInsert;

    /**
     * @param salesRep
     * @param username
     * @return
     * @throws Exception
     */
    @Transactional
    public String createSalesRep(SalesRep salesRep, String username) throws Exception {
        Integer salesRepId = generateSalesRepId();

        logger.info(sqlMarker, salesRepTableInsert);
        logger.info(sqlMarker, "Params {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}", () -> salesRepId, () -> salesRep.getPubKey(), () -> salesRep.getfName(), () -> salesRep.getmName(), () -> salesRep.getlName(), () -> salesRep.getSupId(),
                () -> salesRep.getStatusId(), () -> salesRep.getExtn(), () -> salesRep.getLand(), () -> salesRep.getMob(), () -> salesRep.getEmail(), () -> salesRep.getDoj(), () -> salesRep.getDesig(), () -> username);
        jdbcTemplate.update(salesRepTableInsert, new Object[] { salesRepId, salesRep.getPubKey(), salesRep.getfName(), salesRep.getmName(), salesRep.getlName(), salesRep.getSupId(), salesRep.getStatusId(), salesRep.getExtn(), salesRep.getLand(),
                salesRep.getMob(), salesRep.getEmail(), salesRep.getDoj(), salesRep.getDesig(), username });

        String message = "Sales Representative created with ID: " + salesRepId.toString();
        return message;
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

        logger.debug("Contact ID generated: {}", () -> fetchedSalesRepId);
        return fetchedSalesRepId;
    }

}
