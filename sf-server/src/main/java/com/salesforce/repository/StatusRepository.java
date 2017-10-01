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

import com.salesforce.model.Status;
import com.salesforce.rowmapper.StatusRowMapper;

/**
 * @author Arnab Kr Ghosh
 *
 */

@Component
public class StatusRepository {

    private static final Logger logger = LogManager.getLogger(StatusRepository.class);
    private static final Marker sqlMarker = MarkerManager.getMarker("SQL");

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Value("${sql.status.getAll.byEntity}")
    private String statusGetAllByEntitySql;

    public List<Status> getAllStatusByEntity(String entity, String statusPubKey) {

        Object[] args = { entity, statusPubKey, statusPubKey };
        logger.info(sqlMarker, statusGetAllByEntitySql);
        logger.info(sqlMarker, "Params {}, {}, {}", () -> entity, () -> statusPubKey, () -> statusPubKey);
        List<Status> statusList = (List<Status>) jdbcTemplate.query(statusGetAllByEntitySql, args, new StatusRowMapper());
        logger.debug("Retrieved districts: {}", () -> statusList);
        return statusList;

    }

}
