DROP TABLE IF EXISTS accounts CASCADE;

CREATE TABLE accounts (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  website VARCHAR(255) NOT NULL,
  account_type_id INTEGER REFERENCES account_types(id) ON DELETE CASCADE,
  org_id INTEGER REFERENCES organizations(id) ON DELETE CASCADE,
  creation_date TIMESTAMP,
  is_deleted BOOLEAN
);
