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
import org.springframework.transaction.annotation.Transactional;

import com.salesforce.model.Contact;
import com.salesforce.model.ContactSummary;
import com.salesforce.model.PublicKey;
import com.salesforce.rowmapper.ContactRowMapper;
import com.salesforce.rowmapper.ContactSummaryRowMapper;
import com.salesforce.utils.ApplicationUtils;

/**
 * @author earngho
 *
 */
@Component
public class ContactRepository {
    private static final Logger logger = LogManager.getLogger(ContactRepository.class);
    private static final Marker sqlMarker = MarkerManager.getMarker("SQL");

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Value("${sql.contact.page}")
    private String contactPageSql;

    @Value("${contact.pagesize}")
    private Long contactPageSize;

    @Value("${sql.getSeq.byName}")
    private String getContactSequence;

    @Value("${sql.updateSeq.byName}")
    private String updateContactSequence;

    @Value("${sql.contactTable.insert}")
    private String contactTableInsert;

    @Value("${sql.contactAttrTable.insert}")
    private String contactAttrTableInsert;

    @Value("${sql.contact.select}")
    private String contactSelect;

    public List<ContactSummary> getContactPage(String searchString, long startPosition) {
        Object[] args = { searchString, '%' + searchString + '%', searchString, contactPageSize, startPosition };
        logger.info(sqlMarker, contactPageSql);
        logger.info(sqlMarker, "Params {}, {}, {}, {}, {}", () -> searchString, () -> '%' + searchString + '%', () -> searchString, () -> contactPageSize, () -> startPosition);
        List<ContactSummary> contacts = (List<ContactSummary>) jdbcTemplate.query(contactPageSql, args, new ContactSummaryRowMapper());
        logger.debug("Retrieved contacts: {}", () -> contacts);
        return contacts;
    }

    /**
     * @param contact
     * @param username
     * @return
     * @throws Exception
     */
    @Transactional
    public PublicKey createContact(Contact contact, String username) throws Exception {
        Integer contactId = generateContactId();
        if (contact.getContactSummary() != null) {
            logger.info(sqlMarker, contactTableInsert);
            logger.info(sqlMarker, "Params {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}", () -> contactId, () -> contactId, () -> contact.getContactSummary().getfName(), () -> contact.getContactSummary().getmName(),
                    () -> contact.getContactSummary().getlName(), () -> contact.getContactSummary().getCompany(), () -> contact.getContactSummary().getDesig(), () -> contact.getContactSummary().getEmail(), () -> contact.getContactSummary().getExtn(),
                    () -> contact.getContactSummary().getLand(), () -> contact.getContactSummary().getMob(), () -> username);
            jdbcTemplate.update(contactTableInsert, new Object[] { contactId, contactId, contact.getContactSummary().getfName(), contact.getContactSummary().getmName(), contact.getContactSummary().getlName(), contact.getContactSummary().getCompany(),
                    contact.getContactSummary().getDesig(), contact.getContactSummary().getEmail(), contact.getContactSummary().getExtn(), contact.getContactSummary().getLand(), contact.getContactSummary().getMob(), username });

            logger.info(sqlMarker, contactAttrTableInsert);
            logger.info(sqlMarker, "Params {}, {}, {}, {}, {}, {}, {}, {}, {}", () -> contactId, () -> contact.getAddrLine1(), () -> contact.getAddrLine2(), () -> contact.getdId(), () -> contact.getsId(), () -> contact.getcId(), () -> contact.getZipCode(),
                    () -> contact.getNote(), () -> username);
            jdbcTemplate.update(contactAttrTableInsert, new Object[] { contactId, contact.getAddrLine1(), contact.getAddrLine2(), contact.getdId(), contact.getsId(), contact.getcId(), contact.getZipCode(), contact.getNote(), username });
            PublicKey pubKey = new PublicKey();
            pubKey.setPubKey("CO"+String.format("%08d", contactId));
            return pubKey;
        } else {
            throw new Exception("Contact cannot be created as basic contact data is missing...");
        }
    }

    /**
     * @return
     * @throws Exception
     */
    private Integer generateContactId() throws Exception {

        logger.info(sqlMarker, getContactSequence);
        logger.info(sqlMarker, "Params {}", () -> ApplicationUtils.CONTACT_SEQ_NAME);

        Integer fetchedContactId = jdbcTemplate.queryForObject(getContactSequence, new Object[] { ApplicationUtils.CONTACT_SEQ_NAME }, Integer.class);
        Integer newContactId = fetchedContactId + 1;

        logger.info(sqlMarker, updateContactSequence);
        logger.info(sqlMarker, "Params {} {}", () -> newContactId, () -> ApplicationUtils.CONTACT_SEQ_NAME);
        jdbcTemplate.update(updateContactSequence, new Object[] { newContactId, ApplicationUtils.CONTACT_SEQ_NAME });

        logger.debug("Contact ID generated: {}", () -> fetchedContactId);
        return fetchedContactId;
    }

    public Contact getContact(String pubKey) {
        Object[] args = { pubKey };
        logger.info(sqlMarker, contactSelect);
        logger.info(sqlMarker, "Params {}", () -> pubKey);
        Contact contact = jdbcTemplate.queryForObject(contactSelect, args, new ContactRowMapper());
        logger.debug("Retrieved contact: {}", () -> contact);
        return contact;
    }
}
