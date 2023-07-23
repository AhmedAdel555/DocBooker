/* Replace with your SQL commands */
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
create table client(
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  city VARCHAR(255),
  phone_number VARCHAR(50),
  street_address VARCHAR(255),
  points int DEFAULT 0 NOT NULL
);