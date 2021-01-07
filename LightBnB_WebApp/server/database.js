const { Pool } = require("pg");
const properties = require("./json/properties.json");
const users = require("./json/users.json");

const pool = new Pool({
  user: "vagrant",
  password: "123",
  host: "localhost",
  database: "lightbnb",
});
/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */

// prettier-ignore
const getUserWithEmail = function(email) {
  return pool.query(`
  SELECT * FROM users
  WHERE email = $1
  `, [email])
  .then(res => res.rows[0])
  .catch(err => null)
};

exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
//  prettier-ignore
const getUserWithId = function(id) {
  return pool.query(`
  SELECT * FROM users
  WHERE id = $1
  `, [id])
  .then(res => res.rows[0])
  .catch(err => null)
};

exports.getUserWithId = getUserWithId;

/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
// const addUser = function (user) {
//   const userId = Object.keys(users).length + 1;
//   user.id = userId;
//   users[userId] = user;
//   return Promise.resolve(user);
// };
// prettier-ignore
const addUser = function(user) {
  return pool.query(`
  INSERT INTO users (name, email, password)
  VALUES ($1, $2, $3) RETURNING *;
  `, [user.name, user.email, user.password])
  .then(res => res.rows[0])
  .catch(err => err)
};
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function (guest_id, limit = 10) {
  return pool
    .query(
      `SELECT reservations.*, properties.*, avg(rating)
  FROM properties
  JOIN reservations ON properties.id = reservations.property_id
  JOIN property_reviews ON reservations.property_id = property_reviews.property_id
  WHERE reservations.guest_id = $1 AND end_date < now()::date
  GROUP BY reservations.id, properties.id
  ORDER BY start_date
  LIMIT $2;`,
      [guest_id, limit]
    )
    .then((res) => res.rows)
    .catch((err) => err);
};
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */

const getAllProperties = function (option, limit = 10) {
  const queryParams = [];

  let queryString = `SELECT properties.*, avg(rating) AS average_rating
  FROM properties
  JOIN property_reviews ON properties.id = property_id`;

  if (option.city) {
    queryParams.push(`%${option.city}%`);
    queryString += `
    WHERE city LIKE $${queryParams.length}`;
  }

  if (option.minimum_price_per_night) {
    queryParams.push(option.minimum_price_per_night);
    queryString += ` AND cost_per_night > $${queryParams.length}`;
  }

  if (option.maximum_price_per_night) {
    queryParams.push(option.maximum_price_per_night);
    queryString += ` AND cost_per_night < $${queryParams.length}`;
  }

  queryString += `
  GROUP BY properties.id`;

  if (option.minimum_rating) {
    queryParams.push(option.minimum_rating);
    queryString += ` 
    HAVING avg(rating) > $${queryParams.length}`;
  }
  queryParams.push(limit);
  queryString += `
  ORDER BY cost_per_night
  LIMIT $${queryParams.length};`;

  return pool
    .query(queryString, queryParams)
    .then((res) => res.rows)
    .catch((err) => err);
};

exports.getAllProperties = getAllProperties;

/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function (property) {
  const propertyId = Object.keys(properties).length + 1;
  property.id = propertyId;
  properties[propertyId] = property;
  return Promise.resolve(property);
};
exports.addProperty = addProperty;
