DROP TABLE IF EXISTS organizations CASCADE;

CREATE TABLE organizations (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  abbreviation VARCHAR(3) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  identifier_key VARCHAR(255) NOT NULL,
  master_password VARCHAR(255) NOT NULL,
  is_deleted BOOLEAN DEFAULT FALSE
);
