/**
 * 
 */
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

import com.salesforce.model.District;
import com.salesforce.rowmapper.DistrictRowMapper;

/**
 * @author Arnab Kr Ghosh
 *
 */

@Component
public class DistrictRepository {

    private static final Logger logger = LogManager.getLogger(DistrictRepository.class);
    private static final Marker sqlMarker = MarkerManager.getMarker("SQL");

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Value("${sql.district.get.byStateId}")
    private String districtGetByStateIdSql;

    public List<District> getDistrictsByStateId(int districtId) {

        Object[] args = { districtId };
        logger.info(sqlMarker, districtGetByStateIdSql);
        logger.info(sqlMarker, "Params {}", () -> districtId);
        List<District> districts = (List<District>) jdbcTemplate.query(districtGetByStateIdSql, args, new DistrictRowMapper());
        logger.debug("Retrieved districts: {}", () -> districts);
        return districts;

    }

}
