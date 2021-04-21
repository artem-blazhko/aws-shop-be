DROP TABLE IF EXISTS stocks;
DROP TABLE IF EXISTS products;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title text NOT NULL,
  description text NOT NULL,
  price integer NOT NULL
);

CREATE TABLE IF NOT EXISTS stocks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID,
  count integer NOT NULL,
  CONSTRAINT product_id FOREIGN KEY(product_id) REFERENCES products(id) ON DELETE CASCADE
);

INSERT INTO products (title, description, price) VALUES
    ('sock 1', 'sock 1 description', 100),
    ('sock 2', 'sock 2 description', 200),
    ('sock 3', 'sock 3 description', 300),
    ('sock 4', 'sock 4 description', 400),
    ('sock 5', 'sock 5 description', 500),
    ('sock 6', 'sock 6 description', 600);

INSERT INTO stocks (product_id, count) VALUES
  ((select id from products where price = 100), 1),
  ((select id from products where price = 200), 2),
  ((select id from products where price = 300), 3),
  ((select id from products where price = 400), 4),
  ((select id from products where price = 500), 5),
  ((select id from products where price = 600), 6);
