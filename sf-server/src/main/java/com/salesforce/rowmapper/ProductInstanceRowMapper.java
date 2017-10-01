package com.salesforce.rowmapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import com.salesforce.model.ProductInstance;

public class ProductInstanceRowMapper  implements RowMapper<ProductInstance> {

    @Override
    public ProductInstance mapRow(ResultSet rs, int rowNum) throws SQLException {
        ProductInstance prodInstance = new ProductInstance();
        prodInstance.setPubKey(rs.getString("PUB_KEY"));
        prodInstance.setDes(rs.getString("DES"));
        prodInstance.setQuotePrice(rs.getBigDecimal("QUOTE_PRICE"));
        prodInstance.setActualPrice(rs.getBigDecimal("ACTUAL_PRICE"));
        prodInstance.setDiscType(rs.getInt("DISC_TYPE"));
        prodInstance.setDiscVal(rs.getBigDecimal("DISC_VAL"));
        prodInstance.setUnit(rs.getInt("PROD_UNIT"));
        return prodInstance;
    }

}
