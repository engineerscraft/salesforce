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

import com.salesforce.model.Product;
import com.salesforce.rowmapper.ProductRowMapper;

/**
 * @author Arnab Kr Ghosh
 *
 */

@Component
public class ProductRepository {

    private static final Logger logger = LogManager.getLogger(ProductRepository.class);
    private static final Marker sqlMarker = MarkerManager.getMarker("SQL");

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Value("${sql.product.getAll}")
    private String productListSql;

    @Value("${sql.product.page}")
    private String productPageSql;

    @Value("${product.pagesize}")
    private Long productPageSize;

    public List<Product> getAllProducts() {

        logger.info(sqlMarker, productListSql);
        List<Product> products = (List<Product>) jdbcTemplate.query(productListSql, new ProductRowMapper());
        logger.debug("Retrieved products: {}", () -> products);
        return products;

    }

    public List<Product> getProductPage(String searchString, long startPosition) {
        Object[] args = { searchString, '%' + searchString + '%', searchString, startPosition, productPageSize };
        logger.info(sqlMarker, productPageSql);
        logger.info(sqlMarker, "Params {}, {}, {}, {}, {}", () -> searchString, () -> '%' + searchString + '%', () -> searchString, () -> startPosition, () -> productPageSize);
        List<Product> products = (List<Product>) jdbcTemplate.query(productPageSql, args, new ProductRowMapper());
        logger.debug("Retrieved products: {}", () -> products);
        return products;
    }

}
