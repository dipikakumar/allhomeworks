use sakila;

-- 1a
SELECT first_name, last_name
FROM actor;

-- 1b
SELECT CONCAT (first_name ,' ',last_name) as 'actor_name'
FROM actor;

-- 2a
SELECT actor_id, first_name, last_name
FROM actor where first_name = 'Joe';

-- 2b
SELECT first_name, last_name
FROM actor WHERE last_name LIKE '%GEN%';

-- 2c
SELECT last_name, first_name
FROM actor WHERE last_name LIKE '%LI%';

-- 2d
SELECT country_id, country
FROM country 
Where country IN ('Afghanistan', 'Bangladesh', 'China');

-- 3a
ALTER TABLE actor
ADD description blob;

-- 3b
ALTER TABLE actor
DROP COLUMN description;

-- 4a
SELECT last_name, COUNT(*)
FROM actor
GROUP BY last_name;

-- 4b
SELECT last_name, COUNT(*)
FROM actor
GROUP BY last_name HAVING COUNT(*)>1;

-- 4c
UPDATE actor
SET 
    first_name = 'HARPO'
WHERE 
	first_name = 'GROUCHO' 
AND
    last_name = 'WILLIAMS';
    
-- 4d
UPDATE actor
SET 
	first_name = 'GROUCHO'
WHERE 
	first_name =  'HARPO';
    
-- 5a 
SHOW CREATE TABLE address;

-- 6a 
SELECT first_name,last_name,address
FROM staff s
JOIN address a
ON s.address_id = a.address_id;

-- 6b 
SELECT first_name, last_name, amount, payment_date
From staff s
Join payment p 
ON s.staff_id = p.staff_id
WHERE payment_date LIKE '%2005-08%';

-- 6c
SELECT COUNT(fa.actor_id) AS 'Number of Actors', f.title AS 'Film Title' 
FROM film_actor fa
INNER JOIN film f
ON fa.film_id = f.film_id
GROUP BY f.title;

-- 6d 
SELECT COUNT(i.inventory_id) AS "Number of Copies", f.title AS 'Film Title'
FROM inventory i
INNER JOIN film f
ON i.film_id = f.film_id
WHERE f.title = 'HUNCHBACK IMPOSSIBLE';



-- 6e
SELECT SUM(p.amount) AS 'Payment Amount', c.first_name as 'First Name', c.last_name as 'Last Name'
FROM customer c
JOIN payment p
ON c.customer_id = p.customer_id
GROUP BY p.customer_id
ORDER BY c.last_name ASC;

-- 7a
SELECT title
FROM film
WHERE title LIKE 'K%' OR title LIKE 'Q%'
AND language_id = 
	(SELECT language_id
    FROM language 
    WHERE name= 'english');

-- 7b
SELECT first_name, last_name
FROM actor
WHERE actor_id IN 
	(SELECT actor_id 
	FROM film_actor
	WHERE film_id IN
		(SELECT film_id
		FROM film
		WHERE title = 'Alone Trip'));
    
-- 7c 
SELECT c.first_name, c.last_name, c.email
FROM customer c 
JOIN address a
ON c.address_id = a.address_id
JOIN city ci
ON a.city_id = ci.city_id
JOIN country co
ON ci.country_id = co.country_id
WHERE co.country = 'Canada';

-- 7d
SELECT f.title 
FROM film f
JOIN film_category fc
ON f.film_id = fc.film_id
JOIN category c
ON fc.category_id=c.category_id
WHERE c.name = 'Family';

-- 7e
SELECT f.title, COUNT(r.rental_id) AS 'Number of Times Rented'
from film f
JOIN inventory i
ON f.film_id = i.film_id
JOIN rental r
ON i.inventory_id = r.inventory_id
GROUP BY f.title
ORDER BY 2 DESC;

-- 7f
SELECT s.store_id, SUM(p.amount) AS 'Revenue'
FROM store s
JOIN inventory i
ON s.store_id = i.store_id
JOIN rental r
ON i.inventory_id = r.inventory_id
JOIN payment p
ON r.rental_id = p.rental_id
GROUP BY s.store_id;

-- 7g
SELECT s.store_id, c.city, co.country
FROM store s
JOIN address a
ON s.address_id = a.address_id
JOIN city c
ON a.city_id = c.city_id
JOIN country co
ON c.country_id = co.country_id;


-- 7h
SELECT cat.name, SUM(p.amount) AS 'Gross Revenue'
FROM category cat
JOIN film_category fc
ON cat.category_id = fc.category_id
JOIN inventory i
ON fc.film_id = i.film_id
JOIN rental r
ON i.inventory_id = r.inventory_id
JOIN payment p
ON r.rental_id = p.rental_id
GROUP BY cat.name
ORDER BY 2 DESC LIMIT 5;

-- 8a
CREATE VIEW Top_5_Genres AS
	SELECT cat.name, SUM(p.amount) AS 'Gross Revenue'
	FROM category cat
	JOIN film_category fc
	ON cat.categotop_5_genrestop_5_genresry_id = fc.category_id
	JOIN inventory i
	ON fc.film_id = i.film_id
	JOIN rental r
	ON i.inventory_id = r.inventory_id
	JOIN payment p
	ON r.rental_id = p.rental_id
	GROUP BY cat.name
	ORDER BY 2 DESC LIMIT 5;
    
-- 8b
SELECT * FROM Top_5_Genres;

-- 8c
DROP VIEW Top_5_Genres;
