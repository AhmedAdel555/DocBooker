/* Replace with your SQL commands */
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE doc_sub_specializations (
  doc_id uuid REFERENCES doctor(id) ON DELETE CASCADE ,
  sub_specialization VARCHAR(255) NOT NULL,
  PRIMARY KEY (doc_id, sub_specialization)
);