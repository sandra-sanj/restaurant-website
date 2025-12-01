USE mexican_restaurant;

INSERT INTO users (username, email, password_hash, phone, role) VALUES
('admin', 'admin@restaurant.fi', '$2b$10$By.jHCduv8a0eqeJDW/7Re2RF6IkfQeCOQHFnyUlcnUlsf8D7UifW', '+358123456789', 'admin'),
('liisa', 'liisa@example.fi', '$2b$10$By.jHCduv8a0eqeJDW/7Re2RF6IkfQeCOQHFnyUlcnUlsf8D7UifW', '+358112233445', 'customer'),
('minna', 'minna@example.fi', '$2b$10$By.jHCduv8a0eqeJDW/7Re2RF6IkfQeCOQHFnyUlcnUlsf8D7UifW', '+358998877665', 'customer');

INSERT INTO categories (name, display_order, is_active) VALUES
('Snacks', 1, TRUE),
('Mains', 2, TRUE),
('Desserts', 3, TRUE),
('Drinks', 4, TRUE);

INSERT INTO allergens (name, code) VALUES
('Laktositon / Lactose-free', 'L'),
('Gluteeniton / Gluten-free', 'G'),
('Maidoton / Dairy-free', 'M'),
('Vegaaninen / Vegan', 'VEG');

INSERT INTO menu_items (category_id, name, name_en, description, description_en, price, ingredients, spice_level, allows_spice_custom, available_proteins, default_protein, image_url, image_thumb_url, is_available) VALUES

(1, 'Maissilastut', 'Corn Chips', 'Rapeita maissilastuja, guacamolea sekä raikas tomaattisalsa (pico de gallo)', 'Crispy corn chips served with guacamole and fresh tomato salsa (pico de gallo)', 7.90, 'corn chips, guacamole, tomato salsa', 0, FALSE, NULL, NULL, '/images/corn_chips.jpg', '/images/corn_chips.jpg', TRUE),

(1, 'Chili-mustapapu tostada', 'Chili Black Bean Tostada',
 'Rapea maissitortilla, täytetty maustetuilla mustapavuilla, maissilla, guacamolella ja korianterilla',
 'Crispy corn tortilla topped with spiced black beans, corn, guacamole, and coriander',
 6.90, 'corn tortilla, black beans, corn, guacamole, coriander', 1, FALSE, NULL, NULL, '/images/tostada.jpg', '/images/tostada.jpg', TRUE),

 (2, 'Kanatacot x 3', 'Chicken Tacos x 3',
 'Maissitortillat, kanan paistileikettä, kevyt chilikastike ja tuore korianteri',
 'Corn tortillas with grilled chicken, light chili sauce, and fresh coriander',
 14.50, 'corn tortillas, chicken, chili sauce, coriander', 1, FALSE, NULL, NULL, '/images/chicken-tacos.jpg', '/images/chicken-tacos.jpg', TRUE),

(2, 'Nautatacot x 3', 'Beef Tacos x 3',
 'Maissitortillat, paahdettua naudanlihaa, vihreä salsa (salsa verde) ja sipulia',
 'Corn tortillas with roasted beef, green salsa (salsa verde) and onions',
 14.50, 'corn tortillas, beef, salsa verde, onions', 1, FALSE, NULL, NULL, '/images/beef-tacos.jpg', '/images/beef-tacos.jpg', TRUE),

(2, 'Vegaaniset tacot x 3', 'Vegan Tacos x 3',
 'Maissitortillat, maustettua kasviproteiinia, mustapapusalsa ja korianteria',
 'Corn tortillas with seasoned plant protein, black bean salsa, and coriander',
 14.50, 'corn tortillas, plant protein, black bean salsa, coriander', 1, FALSE, NULL, NULL, '/images/vegan-tacos.jpg', '/images/vegan-tacos.jpg', TRUE),

(2, 'Katkaraputacot x 3', 'Shrimp Tacos x 3',
 'Maissitortillat, valkosipuli-limessä paistettuja katkarapuja, vihreä salsa (salsa verde) ja tuore sipuli',
 'Corn tortillas with garlic-lime shrimp, green salsa (salsa verde), and fresh onion',
 14.50, 'corn tortillas, shrimp, salsa verde, onion, lime', 1, FALSE, NULL, NULL, '/images/shrimp-tacos.jpg', '/images/shrimp-tacos.jpg', TRUE),

(2, 'Burrito', 'Burrito',
 'Vehnätortilla, jossa riisiä, mustia papuja, grillattua maissia, paahdettu chilikastike sekä valitsemasi proteiini. Tulisuus: mieto, medium tai hot',
 'Wheat tortilla filled with rice, black beans, grilled corn, roasted chili sauce, and your choice of protein. Spice: mild, medium, or hot',
 16.90, 'wheat tortilla, rice, black beans, corn, chili sauce', 2, TRUE, 'chicken, beef, vegan, shrimp', 'beef', '/images/burrito.jpg', '/images/burrito.jpg', TRUE),

(2, 'Burrito bowl', 'Burrito bowl',
 'Kulho, jossa lime-riisiä, tuoretta salaattia, mustia papuja, grillattua paprikaa, tomaattisalsa (pico de gallo) ja valitsemasi proteiini. Tulisuus: mieto, medium tai hot',
 'Bowl with lime rice, fresh salad, black beans, grilled peppers, tomato salsa (pico de gallo), and your choice of protein. Spice: mild, medium, or hot',
 16.90, 'lime rice, salad, black beans, peppers, pico de gallo', 2, TRUE, 'chicken, beef, vegan, shrimp', 'beef', '/images/bowl.jpg', '/images/bowl.jpg', TRUE),

(3, 'Churrot', 'Churros',
 'Churroja & suklaakastiketta',
 'Churros with chocolate dipping sauce',
 7.90, 'churros, chocolate sauce', 0, FALSE, NULL, NULL, '/images/churros.jpg', '/images/churros.jpg', TRUE),

(3, 'Flan', 'Flan',
 'Klassinen meksikolainen karamellivanukas',
 'Classic Mexican caramel custard',
 7.90, 'eggs, milk, sugar, caramel', 0, FALSE, NULL, NULL, '/images/flan.jpg', '/images/flan.jpg', TRUE),

(4, 'Jarritos Lime', 'Jarritos Lime',
 '370 ml raikas limen makuinen meksikolainen virvoitusjuoma',
 '370 ml refreshing lime-flavored Mexican soda',
 3.90, 'lime soda', 0, FALSE, NULL, NULL, '/images/jarritos-lime.jpg', '/images/jarritos-lime.jpg', TRUE),

(4, 'Jarritos Guava', 'Jarritos Guava',
 '370 ml makea guavan makuinen meksikolainen virvoitusjuoma',
 '370 ml sweet guava-flavored Mexican soda',
 3.90, 'guava soda', 0, FALSE, NULL, NULL, '/images/jarritos-guava.jpg', '/images/jarritos-guava.jpg', TRUE),

(4, 'Agua De Jamaica', 'Agua De Jamaica',
 '370 ml kirpeän raikas hibiscus-jäätee',
 '370 ml tart and refreshing hibiscus iced tea',
 3.90, 'hibiscus tea', 0, FALSE, NULL, NULL, '/images/agua.jpg', '/images/agua.jpg', TRUE);

INSERT INTO menu_item_allergen (menu_item_id, allergen_id) VALUES
(1, 2), (1, 4),
(2, 2), (2, 4),
(3, 1), (3, 2),
(4, 2),
(5, 2), (5, 4),
(6, 1), (6, 2),
(7, 1),
(8, 1), (8, 2),
(10, 2),
(11, 2), (11, 4),
(12, 2), (12, 4),
(13, 2), (13, 4);


INSERT INTO lunch_specials (menu_item_id, day_of_week, special_price, is_active) VALUES
(3, 'monday', 13.90, TRUE),
(4, 'tuesday', 13.90, TRUE),
(7, 'wednesday', 13.90, TRUE),
(5, 'thursday', 13.90, TRUE),
(8, 'friday', 13.90, TRUE);


INSERT INTO orders (user_id, order_status, total_price, customer_name, customer_email, customer_phone, delivery_address, order_type) VALUES
(2, 'completed', 31.40, 'Liisa Virtanen', 'liisa@example.fi', '+358112233445', NULL, 'pickup'),
(NULL, 'pending', 21.80, 'Juhani Korhonen', 'juhani@example.fi', '+358223344556', 'Myllypurontie 1 , Helsinki', 'delivery');


INSERT INTO order_items (order_id, menu_item_id, item_name, selected_protein, selected_spice_level, quantity, unit_price, special_requests) VALUES
(1, 7, 'Burrito', 'beef', 3, 1, 16.90, 'No onions'),
(1, 1, 'Maissilastut', NULL, NULL, 1, 7.90, NULL),
(1, 11, 'Jarritos Lime', NULL, NULL, 2, 3.90, NULL),
(2, 8, 'Burrito bowl', 'vegan', 2, 1, 16.90, NULL),
(2, 13, 'Agua De Jamaica', NULL, NULL, 1, 3.90, 'Extra ice');
