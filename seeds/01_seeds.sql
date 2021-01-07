INSERT INTO users (name, email, password)
VALUES ('Natasha Colusso', 'natashacolusso@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u'),
('John Doe', 'john.doe@example.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u'),
('Jane Robinson', 'jane_r@example.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u'),
('Johnny Appleseed', 'johnny@apple.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u');

INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code)
VALUES (1, 'Home Away from Home', 'descriptive text', 'https://images.pexels.com/photos/5101217/pexels-photo-5101217.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500', 'https://images.pexels.com/photos/4785694/pexels-photo-4785694.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500', 250, 2, 3, 5, 'Jamaica', '123 Beauty St', 'Montego Bay', 'St. James Parish', '123468'),
(1, 'Home at Home', 'descriptive text', 'https://images.pexels.com/photos/5101217/pexels-photo-5101217.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500', 'https://images.pexels.com/photos/4785694/pexels-photo-4785694.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500', 200, 2, 2, 3, 'Canada', '111 Main St', 'Vancouver', 'British Columbia', 'V0V0V0'),
(4, 'Sweet Bungalo', 'description', 'https://images.pexels.com/photos/5101217/pexels-photo-5101217.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500', 'https://images.pexels.com/photos/4785694/pexels-photo-4785694.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500', 150, 1, 1, 2, 'Canada', '111 Other St', 'Toronto', 'Ontario', 'A1A1A1');

INSERT INTO reservations (start_date, end_date, property_id, guest_id)
VALUES ('2021-03-01', '2021-03-15', 1, 3),
('2020-11-15', '2020-12-15', 2, 4),
('2020-07-15', '2020-08-15', 1, 3),
('2020-09-15', '2020-10-05', 1, 2),
('2021-07-09', '2021-07-15', 3, 1);

INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating)
VALUES (2, 1, 4, 5),
(4, 2, 2, 4),
(3, 1, 3, 4);