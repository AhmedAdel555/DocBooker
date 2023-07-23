/* Replace with your SQL commands */
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE entity(
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  type VARCHAR(255) NOT NULL,
  price INT NOT NULL,
  street_address VARCHAR(255) NOT NULL,
  city VARCHAR(255) NOT NULL,
  state VARCHAR(255) NOT NULL,
  doc_id uuid REFERENCES doctor(id) ON DELETE CASCADE
);