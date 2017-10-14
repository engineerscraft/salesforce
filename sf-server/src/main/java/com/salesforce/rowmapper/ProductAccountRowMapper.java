package com.salesforce.rowmapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import com.salesforce.model.ProductAccount;

public class ProductAccountRowMapper implements RowMapper<ProductAccount> {

    @Override
    public ProductAccount mapRow(ResultSet rs, int rowNum) throws SQLException {
        ProductAccount prodAccount = new ProductAccount();
        prodAccount.setPubKey(rs.getString("PUB_KEY"));
        prodAccount.setDes(rs.getString("DES"));
        prodAccount.setSoldPrice(rs.getBigDecimal("SOLD_PRICE"));
        prodAccount.setDiscType(rs.getInt("DISC_TYPE"));
        prodAccount.setDiscVal(rs.getBigDecimal("DISC_VAL"));
        return prodAccount;
    }

}
