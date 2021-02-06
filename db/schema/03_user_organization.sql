DROP TABLE IF EXISTS users_organizations CASCADE;

CREATE TABLE users_organizations (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  org_id INTEGER REFERENCES organizations(id) ON DELETE CASCADE,
  is_deleted BOOLEAN DEFAULT FALSE
);
