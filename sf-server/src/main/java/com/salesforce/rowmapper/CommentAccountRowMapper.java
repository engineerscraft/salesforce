package com.salesforce.rowmapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import com.salesforce.model.Comment;

/**
 * @author Arnab Kr Ghosh
 *
 */
public class CommentAccountRowMapper implements RowMapper<Comment> {

    @Override
    public Comment mapRow(ResultSet rs, int rowNum) throws SQLException {
        Comment comment = new Comment();
        comment.setCrtdBy(rs.getString("CRTD_BY"));
        comment.setNote(rs.getString("NOTE"));
        comment.setCrtdByPubKey(rs.getString("CRTD_BY_PUB_KEY"));
        comment.setCrtdOn(rs.getDate("CRTD_ON"));
        comment.setEntityPubKey(rs.getString("ENTITY_PUB_KEY"));
        return comment;
    }
}
