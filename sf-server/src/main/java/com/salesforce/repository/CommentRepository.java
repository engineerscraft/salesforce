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

import com.salesforce.model.Comment;
import com.salesforce.rowmapper.CommentRowMapper;
import com.salesforce.utils.ApplicationUtils;

@Component
public class CommentRepository {
    private static final Logger logger = LogManager.getLogger(ContactRepository.class);
    private static final Marker sqlMarker = MarkerManager.getMarker("SQL");

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Value("${sql.comment.page}")
    private String leadCommentPageSql;

    @Value("${comment.pagesize}")
    private Long commentPageSize;

    @Value("${sql.getSeq.byName}")
    private String getCommentSequence;

    @Value("${sql.updateSeq.byName}")
    private String updateCommentSequence;

    @Value("${sql.commentTable.insert}")
    private String commentTableInsert;

    public List<Comment> getCommentPage(String pubKey, long startPosition) {
        Object[] args = { pubKey, pubKey, startPosition, commentPageSize };
        String sql = null;

        if (pubKey.contains("LD")) {
            sql = leadCommentPageSql;
        }
        logger.info(sqlMarker, sql);
        logger.info(sqlMarker, "Params {}. {}, {}, {}", () -> pubKey, () -> pubKey, () -> startPosition, () -> commentPageSize);
        List<Comment> comments = (List<Comment>) jdbcTemplate.query(leadCommentPageSql, args, new CommentRowMapper());
        logger.debug("Retrieved comments: {}", () -> comments);
        return comments;
    }

    public void createComment(Comment comment, String username) throws Exception {
        Integer commentId = generateContactId();

        logger.info(sqlMarker, commentTableInsert);
        logger.info(sqlMarker, "Params {}, {}, {}, {}, {}", () -> commentId, () -> comment.getEntityPubKey(), () -> comment.getNote(), () -> username, () -> comment.getStatusPubKey());
        jdbcTemplate.update(commentTableInsert, new Object[] { commentId, comment.getEntityPubKey(), comment.getNote(), username, comment.getStatusPubKey() });
        
    }

    private Integer generateContactId() throws Exception {

        logger.info(sqlMarker, getCommentSequence);
        logger.info(sqlMarker, "Params {}", () -> ApplicationUtils.LEAD_TIMELINE_SEQ_NAME);

        Integer fetchedCommentId = jdbcTemplate.queryForObject(getCommentSequence, new Object[] { ApplicationUtils.LEAD_TIMELINE_SEQ_NAME }, Integer.class);
        Integer newCommentId = fetchedCommentId + 1;

        logger.info(sqlMarker, updateCommentSequence);
        logger.info(sqlMarker, "Params {} {}", () -> newCommentId, () -> ApplicationUtils.LEAD_TIMELINE_SEQ_NAME);
        jdbcTemplate.update(updateCommentSequence, new Object[] { newCommentId, ApplicationUtils.LEAD_TIMELINE_SEQ_NAME });

        logger.debug("Contact ID generated: {}", () -> fetchedCommentId);
        return fetchedCommentId;
    }
}
