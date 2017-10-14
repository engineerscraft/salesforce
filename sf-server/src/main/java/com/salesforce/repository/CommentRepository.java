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
import com.salesforce.rowmapper.CommentAccountRowMapper;
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

    @Value("${sql.commentAccount.page}")
    private String accountCommentPageSql;

    @Value("${comment.pagesize}")
    private Long commentPageSize;

    @Value("${sql.getSeq.byName}")
    private String getCommentSequence;

    @Value("${sql.updateSeq.byName}")
    private String updateCommentSequence;

    @Value("${sql.commentTable.insert}")
    private String commentTableInsert;
    
    @Value("${sql.initialCommentTable.insert}")
    private String initialCommentTableInsert;

    @Value("${sql.commentAccount.insert}")
    private String commentAccountTableInsert;

    public List<Comment> getCommentPage(String pubKey, long startPosition) {
        Object[] args = { pubKey, pubKey, startPosition, commentPageSize };
        String sql = null;
        List<Comment> comments = null;

        if (pubKey.contains("LD")) {
            sql = leadCommentPageSql;
        } else if (pubKey.contains("AC")) {
            sql = accountCommentPageSql;
        }
        logger.info(sqlMarker, sql);
        logger.info(sqlMarker, "Params {}. {}, {}, {}", () -> pubKey, () -> pubKey, () -> startPosition, () -> commentPageSize);
        if (pubKey.contains("LD")) {
            comments = (List<Comment>) jdbcTemplate.query(leadCommentPageSql, args, new CommentRowMapper());
        } else if (pubKey.contains("AC")) {
            comments = (List<Comment>) jdbcTemplate.query(accountCommentPageSql, args, new CommentAccountRowMapper());
        }
        logger.debug("Retrieved comments: ", comments);
        return comments;
    }

    public void createComment(Comment comment, String username) throws Exception {
        Integer commentId = generateId(comment.getEntityPubKey());

        if (comment.getEntityPubKey().contains("LD")) {
            logger.info(sqlMarker, commentTableInsert);
            logger.info(sqlMarker, "Params {}, {}, {}, {}, {}", () -> commentId, () -> comment.getEntityPubKey(), () -> comment.getNote(), () -> username, () -> comment.getStatusPubKey());
            jdbcTemplate.update(commentTableInsert, new Object[] { commentId, comment.getEntityPubKey(), comment.getNote(), username, comment.getStatusPubKey() });
        } else if (comment.getEntityPubKey().contains("AC")) {
            logger.info(sqlMarker, commentAccountTableInsert);
            logger.info(sqlMarker, "Params {}, {}, {}, {}", () -> commentId, () -> comment.getEntityPubKey(), () -> comment.getNote(), () -> username);
            jdbcTemplate.update(commentAccountTableInsert, new Object[] { commentId, comment.getEntityPubKey(), comment.getNote(), username });
        }

    }

    private Integer generateId(String pubKey) throws Exception {
        Integer fetchedCommentId = 0;
        String seqName = null;
        logger.info(sqlMarker, getCommentSequence);
        if (pubKey.contains("LD")) {
            seqName = ApplicationUtils.LEAD_TIMELINE_SEQ_NAME;
        } else if (pubKey.contains("AC")) {
            seqName = ApplicationUtils.ACCOUNT_TM_SEQ_NAME;
        }
        logger.info(sqlMarker, "Params ", seqName);
        fetchedCommentId = jdbcTemplate.queryForObject(getCommentSequence, new Object[] { seqName }, Integer.class);
        Integer newCommentId = fetchedCommentId + 1;

        logger.info(sqlMarker, updateCommentSequence);
        logger.info(sqlMarker, "Params {} {}", newCommentId, seqName);
        jdbcTemplate.update(updateCommentSequence, new Object[] { newCommentId, seqName });

        logger.debug("Contact ID generated: ", fetchedCommentId);
        return fetchedCommentId;
    }
}
