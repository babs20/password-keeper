DROP TABLE IF EXISTS users_organization CASCADE;

CREATE TABLE users_organization (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  org_id INTEGER REFERENCES organization(id) ON DELETE CASCADE,
  is_deleted BOOLEAN
);
