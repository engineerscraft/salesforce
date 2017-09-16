package com.salesforce.rowmapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import com.salesforce.model.Product;

/**
 * @author Arnab Kr Ghosh
 *
 */

public class ProductRowMapper implements RowMapper<Product> {

    public Product mapRow(ResultSet rs, int rowNum) throws SQLException {
        Product product = new Product();
        product.setProdId(rs.getInt("PROD_ID"));
        product.setPubKey(rs.getString("PUB_KEY"));
        product.setDes(rs.getString("DES"));
        product.setPrice(rs.getDouble("PRICE"));
        return product;
    }
}
