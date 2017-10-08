package com.salesforce.rowmapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import com.salesforce.model.Comment;

public class CommentRowMapper implements RowMapper<Comment> {

    @Override
    public Comment mapRow(ResultSet rs, int rowNum) throws SQLException {
        Comment comment = new Comment();
        comment.setCrtdBy(rs.getString("CRTD_BY"));
        comment.setNote(rs.getString("NOTE"));
        comment.setCrtdByPubKey(rs.getString("CRTD_BY_PUB_KEY"));
        comment.setCrtdOn(rs.getDate("CRTD_ON"));
        comment.setStatus(rs.getString("STATUS"));
        comment.setStatusPubKey(rs.getString("STATUS_PUB_KEY"));
        comment.setEntityPubKey(rs.getString("ENTITY_PUB_KEY"));
        return comment;
    }
}
