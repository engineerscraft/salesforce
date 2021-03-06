DROP ROLE IF EXISTS "sfmapp";
CREATE USER "sfmapp" WITH CREATEROLE PASSWORD 'sfmapp';

CREATE EXTENSION pg_trgm;

CREATE TABLE SFM.APP_SEQUENCE (
  SEQ_NAME VARCHAR(20) PRIMARY KEY,
  SEQ_VALUE BIGINT CHECK (SEQ_VALUE > 0) NOT NULL
);

CREATE TABLE SFM.STATUS (
	STATUS_ID SMALLINT PRIMARY KEY,
	PUB_KEY VARCHAR(15) NOT NULL UNIQUE,
	DES VARCHAR(20) NOT NULL,
	COLOR VARCHAR(10),
	ENTITY VARCHAR(15),
	SORT_ORDER SMALLINT,
	CONV CHAR(1)
);

CREATE TABLE SFM.ACCESS_TOKEN (
  ACCESS_ID BIGINT PRIMARY KEY,
  INSERT_DATE TIMESTAMP(0) NOT NULL,
  USER_NAME VARCHAR(30) NOT NULL,
  EXPIRY_DATE TIMESTAMP(0) NOT NULL,
  REFRESH_COUNT INT NOT NULL,
  LAST_REFRESH_DATE TIMESTAMP(0)
);

CREATE TABLE SFM.COUNTRY(
	C_ID INT PRIMARY KEY,
	C_NAME VARCHAR(50) NOT NULL
);

CREATE TABLE SFM.STATE(
	S_ID INT PRIMARY KEY,
	S_NAME VARCHAR(32) NOT NULL,
	C_ID INT NOT NULL,
	FOREIGN KEY(C_ID) REFERENCES SFM.COUNTRY(C_ID)
);

CREATE TABLE SFM.DISTRICT(
	D_ID INT PRIMARY KEY,
	D_NAME VARCHAR(32) NOT NULL,
	S_ID INT NOT NULL,
	FOREIGN KEY(S_ID) REFERENCES SFM.STATE(S_ID)
);

CREATE TABLE SFM.ROLE (
	ROLE_ID INT PRIMARY KEY,
	PUB_KEY VARCHAR(30) NOT NULL,
	DES VARCHAR(60) NOT NULL
);

CREATE TABLE SFM.PERMISSION (
	PERM_ID INT PRIMARY KEY,
	PUB_KEY VARCHAR(50) NOT NULL UNIQUE,
	DES VARCHAR(100) NOT NULL,
	PERM_TYPE VARCHAR(1) NOT NULL
);

CREATE TABLE SFM.ROLE_PERM (
	ROLE_ID INT NOT NULL,
	PERM_ID INT NOT NULL,
	PRIMARY KEY (ROLE_ID, PERM_ID),
	FOREIGN KEY(ROLE_ID) REFERENCES SFM.ROLE(ROLE_ID),
	FOREIGN KEY(PERM_ID) REFERENCES SFM.PERMISSION(PERM_ID)
);

CREATE TABLE SFM.DIVISION (
	DIV_ID INT PRIMARY KEY,
	PUB_KEY VARCHAR(15) NOT NULL UNIQUE,
	DES VARCHAR(100) NOT NULL,
	CRTD_BY VARCHAR(15) NOT NULL,
	CRTD_ON TIMESTAMP NOT NULL,
	MOD_BY VARCHAR(15),
	MOD_ON TIMESTAMP
);

CREATE TABLE SFM.PRODUCT (
	PROD_ID INT PRIMARY KEY,
	PUB_KEY VARCHAR(15) NOT NULL UNIQUE,
	DES VARCHAR(100) NOT NULL,
	VFROM DATE NOT NULL,
	VTO DATE,
	PRICE DECIMAL(32,2) NOT NULL,
	CRTD_BY VARCHAR(15) NOT NULL,
	CRTD_ON TIMESTAMP NOT NULL,
	MOD_BY VARCHAR(15),
	MOD_ON TIMESTAMP
);

CREATE TABLE SFM.SALES_REP (
	SALES_REP_ID INT PRIMARY KEY,
	PUB_KEY VARCHAR(15) NOT NULL UNIQUE,
	F_NAME VARCHAR(60) NOT NULL,
	M_NAME VARCHAR(60),
	L_NAME VARCHAR(60),
	SUP_ID INT,
	STATUS_ID SMALLINT NOT NULL,
	EXTN VARCHAR(10),
	LAND VARCHAR(20),
	MOB VARCHAR(20),
	EMAIL VARCHAR(100) NOT NULL,
	DOJ DATE NOT NULL,
	DESIG VARCHAR(100) NOT NULL,
	CRTD_BY VARCHAR(15) NOT NULL,
	CRTD_ON TIMESTAMP NOT NULL,
	MOD_BY VARCHAR(15),
	MOD_ON TIMESTAMP,
	FOREIGN KEY(SUP_ID) REFERENCES SFM.SALES_REP(SALES_REP_ID),	
	FOREIGN KEY(STATUS_ID) REFERENCES SFM.STATUS(STATUS_ID)
);

CREATE TABLE SFM.SALES_REP_PROFILE (
	SALES_REP_ID INT,
	IMG TEXT,
	CRTD_BY VARCHAR(15) NOT NULL,
	CRTD_ON TIMESTAMP NOT NULL,
	MOD_BY VARCHAR(15),
	MOD_ON TIMESTAMP	
);

CREATE TABLE SFM.CONTACT (
	CO_ID INT PRIMARY KEY,
	PUB_KEY VARCHAR(15) NOT NULL UNIQUE,
	F_NAME VARCHAR(60) NOT NULL,
	M_NAME VARCHAR(60),
	L_NAME VARCHAR(60),
	COMPANY VARCHAR(100),
	DESIG VARCHAR(50),
	EMAIL VARCHAR(100) NOT NULL,
	EXTN VARCHAR(10),
	LAND VARCHAR(20),
	MOB VARCHAR(20),
	CRTD_BY VARCHAR(15) NOT NULL,
	CRTD_ON TIMESTAMP NOT NULL,
	MOD_BY VARCHAR(15),
	MOD_ON TIMESTAMP
);

CREATE TABLE SFM.CONTACT_ATTR (
	CO_ID INT PRIMARY KEY,
	ADDR_LINE_1 VARCHAR(200),
	ADDR_LINE_2 VARCHAR(200),
	D_ID SMALLINT,
	S_ID SMALLINT,
	C_ID SMALLINT,
	ZIP_CODE VARCHAR(15),
	NOTE VARCHAR(2000),
	CRTD_BY VARCHAR(15) NOT NULL,
	CRTD_ON TIMESTAMP NOT NULL,
	MOD_BY VARCHAR(15),
	MOD_ON TIMESTAMP,
	FOREIGN KEY(C_ID) REFERENCES SFM.COUNTRY(C_ID),
	FOREIGN KEY(S_ID) REFERENCES SFM.STATE(S_ID),
	FOREIGN KEY(D_ID) REFERENCES SFM.DISTRICT(D_ID),
	FOREIGN KEY(CO_ID) REFERENCES SFM.CONTACT(CO_ID)
);

CREATE TABLE SFM.ACCOUNT (
	ACC_ID INT PRIMARY KEY,
	PUB_KEY VARCHAR(15) NOT NULL UNIQUE,
	TITLE  VARCHAR(100) NOT NULL,
	STATUS_ID SMALLINT NOT NULL,
	DIV_ID INT NOT NULL,
	SOLD_PRICE DECIMAL(32,2),
	CRTD_BY VARCHAR(15) NOT NULL,
	CRTD_ON TIMESTAMP NOT NULL,
	MOD_BY VARCHAR(15),
	MOD_ON TIMESTAMP,
	RD_ONLY VARCHAR(1),
	FOREIGN KEY(DIV_ID) REFERENCES SFM.DIVISION(DIV_ID),	
	FOREIGN KEY(STATUS_ID) REFERENCES SFM.STATUS(STATUS_ID)
);

CREATE TABLE SFM.LEAD (
	LEAD_ID INT PRIMARY KEY,
	PUB_KEY VARCHAR(15) NOT NULL UNIQUE,
	TITLE VARCHAR(100) NOT NULL,
	DISC_TYPE INT NOT NULL,
	DISC_VAL DECIMAL(3,2) NOT NULL,
	QUOTE_PRICE DECIMAL(32,2),
	STATUS_ID SMALLINT NOT NULL,
	DIV_ID INT NOT NULL,
	ACC_ID INT,
	CRTD_BY VARCHAR(15) NOT NULL,
	CRTD_ON TIMESTAMP NOT NULL,
	MOD_BY VARCHAR(15),
	MOD_ON TIMESTAMP,
	RD_ONLY VARCHAR(1),
	FOREIGN KEY(DIV_ID) REFERENCES SFM.DIVISION(DIV_ID),
	FOREIGN KEY(STATUS_ID) REFERENCES SFM.STATUS(STATUS_ID),
	FOREIGN KEY(ACC_ID) REFERENCES SFM.ACCOUNT(ACC_ID)
);

CREATE TABLE SFM.LEAD_ATTR (
	LEAD_ID INT PRIMARY KEY,
	CRTD_BY VARCHAR(15) NOT NULL,
	CRTD_ON TIMESTAMP NOT NULL,
	MOD_BY VARCHAR(15),
	MOD_ON TIMESTAMP,
	FOREIGN KEY(LEAD_ID) REFERENCES SFM.LEAD(LEAD_ID)
);

CREATE TABLE SFM.LEAD_PROD (
	LEAD_ID INT,
	PROD_ID INT,
	PROD_UNIT DECIMAL(32,2),
	DISC_TYPE INT NOT NULL,
	DISC_VAL DECIMAL(3,2) NOT NULL,
	QUOTE_PRICE DECIMAL(32,2) NOT NULL,
	ACTUAL_PRICE DECIMAL(32,2) NOT NULL,
	CRTD_BY VARCHAR(15) NOT NULL,
	CRTD_ON TIMESTAMP NOT NULL,
	MOD_BY VARCHAR(15),
	MOD_ON TIMESTAMP,
	FOREIGN KEY(LEAD_ID) REFERENCES SFM.LEAD(LEAD_ID),
	FOREIGN KEY(PROD_ID) REFERENCES SFM.PRODUCT(PROD_ID),
	PRIMARY KEY (LEAD_ID, PROD_ID)
);

CREATE TABLE SFM.LEAD_CONTACT (
	LEAD_ID INT NOT NULL,
	CO_ID INT NOT NULL,
	CRTD_BY VARCHAR(15) NOT NULL,
	CRTD_ON TIMESTAMP NOT NULL,
	MOD_BY VARCHAR(15),
	MOD_ON TIMESTAMP,
	FOREIGN KEY(LEAD_ID) REFERENCES SFM.LEAD(LEAD_ID),
	FOREIGN KEY(CO_ID) REFERENCES SFM.CONTACT(CO_ID),
	PRIMARY KEY (LEAD_ID, CO_ID)
);

CREATE TABLE SFM.LEAD_TIMELINE (
	ENTRY_ID BIGINT PRIMARY KEY,
	LEAD_ID INT NOT NULL,
	NOTE TEXT NOT NULL,
	CRTD_BY VARCHAR(15),
	CRTD_ON TIMESTAMP,
	MOD_BY VARCHAR(15),
	MOD_ON TIMESTAMP,
	STATUS_ID INT,
	FOREIGN KEY(STATUS_ID) REFERENCES SFM.STATUS(STATUS_ID),
	FOREIGN KEY(LEAD_ID) REFERENCES SFM.LEAD(LEAD_ID)	
);

CREATE TABLE SFM.OPPORTUNITY (
	OPP_ID INT PRIMARY KEY,
	PUB_KEY VARCHAR(15) NOT NULL UNIQUE,
	DISC_TYPE INT NOT NULL,
	DISC_VAL DECIMAL(3,2) NOT NULL,
	QUOTE_PRICE DECIMAL(32,2),	
	TITLE VARCHAR(100) NOT NULL,
	STATUS_ID SMALLINT NOT NULL,
	DIV_ID INT NOT NULL,
	ACC_ID INT,
	LEAD_ID INT,
	CRTD_BY VARCHAR(15) NOT NULL,
	CRTD_ON TIMESTAMP NOT NULL,
	MOD_BY VARCHAR(15),
	MOD_ON TIMESTAMP,
	RD_ONLY VARCHAR(1),
	FOREIGN KEY(DIV_ID) REFERENCES SFM.DIVISION(DIV_ID),
	FOREIGN KEY(LEAD_ID) REFERENCES SFM.LEAD(LEAD_ID),	
	FOREIGN KEY(STATUS_ID) REFERENCES SFM.STATUS(STATUS_ID),
	FOREIGN KEY(ACC_ID) REFERENCES SFM.ACCOUNT(ACC_ID)
);

CREATE TABLE SFM.OPPORTUNITY_ATTR (
	OPP_ID INT PRIMARY KEY,
	FOREIGN KEY(OPP_ID) REFERENCES SFM.OPPORTUNITY(OPP_ID)
);

CREATE TABLE SFM.OPPORTUNITY_PROD (
	OPP_ID INT,
	PROD_ID INT,
	PROD_UNIT DECIMAL(32,2),
	DISC_TYPE INT NOT NULL,
	DISC_VAL DECIMAL(3,2) NOT NULL,
	QUOTE_PRICE DECIMAL(32,2),	
	ACTUAL_PRICE DECIMAL(32,2),	
	CRTD_BY VARCHAR(15),
	CRTD_ON TIMESTAMP,
	MOD_BY VARCHAR(15),
	MOD_ON TIMESTAMP,
	FOREIGN KEY(OPP_ID) REFERENCES SFM.OPPORTUNITY(OPP_ID),
	FOREIGN KEY(PROD_ID) REFERENCES SFM.PRODUCT(PROD_ID),
	PRIMARY KEY (OPP_ID, PROD_ID)
);

CREATE TABLE SFM.OPPORTUNITY_CONTACT (
	OPP_ID INT,
	CO_ID INT,
	CRTD_BY VARCHAR(15) NOT NULL,
	CRTD_ON TIMESTAMP NOT NULL,
	MOD_BY VARCHAR(15),
	MOD_ON TIMESTAMP,
	FOREIGN KEY(OPP_ID) REFERENCES SFM.OPPORTUNITY(OPP_ID),
	FOREIGN KEY(CO_ID) REFERENCES SFM.CONTACT(CO_ID),
	PRIMARY KEY (OPP_ID, CO_ID)
);

CREATE TABLE SFM.OPPORTUNITY_TIMELINE (
	ENTRY_ID BIGINT PRIMARY KEY,
	OPP_ID INT NOT NULL,
	NOTE TEXT NOT NULL,
	CRTD_BY VARCHAR(15) NOT NULL,
	CRTD_ON TIMESTAMP NOT NULL,
	MOD_BY VARCHAR(15),
	MOD_ON TIMESTAMP,
	STATUS_ID INT,
	FOREIGN KEY(STATUS_ID) REFERENCES SFM.STATUS(STATUS_ID),
	FOREIGN KEY(OPP_ID) REFERENCES SFM.OPPORTUNITY(OPP_ID)
);

CREATE TABLE SFM.ACCOUNT_ATTR (
	ACC_ID INT PRIMARY KEY,
	FOREIGN KEY(ACC_ID) REFERENCES SFM.ACCOUNT(ACC_ID)
);

CREATE TABLE SFM.ACCOUNT_PROD (
	ACC_ID INT NOT NULL,
	PROD_ID INT NOT NULL,
	DISC_TYPE INT NOT NULL,
	DISC_VAL DECIMAL(3,2) NOT NULL,
	SOLD_PRICE DECIMAL(32,2) NOT NULL,
	CRTD_BY VARCHAR(15) NOT NULL,
	CRTD_ON TIMESTAMP NOT NULL,
	MOD_BY VARCHAR(15),
	MOD_ON TIMESTAMP,
	PRIMARY KEY (ACC_ID, PROD_ID),
	FOREIGN KEY(ACC_ID) REFERENCES SFM.ACCOUNT(ACC_ID),
	FOREIGN KEY(PROD_ID) REFERENCES SFM.PRODUCT(PROD_ID)	
);

CREATE TABLE SFM.ACCOUNT_CONTACT (
	ACC_ID INT NOT NULL,
	CO_ID INT NOT NULL,
	CRTD_BY VARCHAR(15) NOT NULL,
	CRTD_ON TIMESTAMP NOT NULL,
	MOD_BY VARCHAR(15),
	MOD_ON TIMESTAMP,
	PRIMARY KEY (ACC_ID, CO_ID),
	FOREIGN KEY(ACC_ID) REFERENCES SFM.ACCOUNT(ACC_ID),
	FOREIGN KEY(CO_ID) REFERENCES SFM.CONTACT(CO_ID)
);

CREATE TABLE SFM.ACCOUNT_TIMELINE (
	ENTRY_ID BIGINT PRIMARY KEY,
	ACC_ID INT NOT NULL,
	NOTE TEXT NOT NULL,
	CRTD_BY VARCHAR(15) NOT NULL,
	CRTD_ON TIMESTAMP NOT NULL,
	MOD_BY VARCHAR(15),
	MOD_ON TIMESTAMP,
	STATUS_ID INT,
	FOREIGN KEY(ACC_ID) REFERENCES SFM.ACCOUNT(ACC_ID)
);

CREATE TABLE SFM.DIV_ROLE (
	DIV_ID INT NOT NULL,
	ROLE_ID INT NOT NULL,
	FOREIGN KEY(DIV_ID) REFERENCES SFM.DIVISION(DIV_ID),	
	FOREIGN KEY(ROLE_ID) REFERENCES SFM.ROLE(ROLE_ID)
);

create or replace FUNCTION sfm.f_immutable_concat_ws_ten_var(s1 varchar, s2 varchar, s3 varchar, s4 varchar, s5 varchar, s6 varchar, s7 varchar, s8 varchar, s9 varchar, s10 varchar)
RETURNS varchar AS
$func$
SELECT concat_ws(s1, s2, s3, s4, s5, s6, s7, s8, s9, s10)
$func$ LANGUAGE sql IMMUTABLE;

CREATE INDEX contact_all_trg_idx ON sfm.contact
USING gin(to_tsvector('english',(sfm.f_immutable_concat_ws_ten_var(pub_key, f_name, m_name, l_name, company, desig, email, land, mob, null))));

create index name_idx on sfm.contact(f_name, m_name, l_name);
create index company_idx on sfm.contact(company);
create index desig_idx on sfm.contact(desig);
create index email_idx on sfm.contact(email);
create index mob_idx on sfm.contact(mob);


CREATE INDEX salesrep_all_trg_idx ON sfm.sales_rep
USING gin(to_tsvector('english',(sfm.f_immutable_concat_ws_ten_var(pub_key, f_name, m_name, l_name, land, mob,  email, desig, null, null))));

create index salesrep_name_idx on sfm.sales_rep(f_name, m_name, l_name);
create index salesrep_desig_idx on sfm.sales_rep(desig);
create index salesrep_email_idx on sfm.sales_rep(email);
create index salesrep_mob_idx on sfm.sales_rep(mob);

CREATE INDEX product_all_trg_idx ON sfm.product
USING gin(to_tsvector('english',(sfm.f_immutable_concat_ws_ten_var(pub_key, des, null, null, null, null,  null, null, null, null))));

CREATE INDEX account_all_trg_idx ON sfm.account
USING gin(to_tsvector('english',(sfm.f_immutable_concat_ws_ten_var(pub_key, title, null, null, null, null,  null, null, null, null))));

CREATE SEQUENCE SFM.ACCESS_ID_SEQ START WITH 1 INCREMENT BY 1 CACHE 5 CYCLE;

GRANT ALL ON SCHEMA SFM TO "sfmapp";
GRANT ALL ON ALL TABLES IN SCHEMA SFM TO "sfmapp";
GRANT ALL ON ALL SEQUENCES IN SCHEMA SFM TO "sfmapp";
