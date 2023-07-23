/* Replace with your SQL commands */
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE entity_phone_number(
  ent_id uuid REFERENCES entity(id) ON DELETE CASCADE ,
  phone_number VARCHAR(50),
  PRIMARY KEY (ent_id, phone_number)
);