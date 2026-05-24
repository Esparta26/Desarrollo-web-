USE stylehub_db;

INSERT INTO categories (id, name) VALUES 
(1, 'hoodies'), (2, 'zapatillas'), (3, 'camisetas'), (4, 'gorras'), (5, 'pantalones');

INSERT INTO sizes (id, name) VALUES 
(1, 'S'), (2, 'M'), (3, 'L'), (4, 'X');

INSERT INTO users (full_name, email, password) VALUES 
('Raúl Andrés', 'raul@stylehub.com', '$2a$10$wK1W6QO8q2L4G3.6J/yB.O4/95qXG5/1U0.12/7.3.0/8/8.4/3/2');

INSERT INTO products (id, name, price, img, description, stock, slug, category_id, size_id) VALUES 
(1, 'Hoodie Oversize Street', 120000, 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=300&q=80', 'Nuestro Hoodie Oversize Street...', 10, 'hoodie-oversize-street', 1, NULL),
(2, 'Zapatillas Tipo Jordan NYKE', 95000, 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=300&q=80', 'Nuestras Zapatillas Nike Jordan...', 10, 'zapatillas-tipo-jordan-nyke', 2, 4);