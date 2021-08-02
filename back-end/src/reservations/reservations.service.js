const knex = require("../db/connection");
const tableName = "reservations";

function list(reservation_date) {
  if (!reservation_date) {
    return knex(tableName)
      .select("*")
      .orderBy("reservation_date", "asc")
      .orderBy("reservation_time", "asc");
  } else {
    return knex(tableName)
      .select("*")
      .orderBy("reservation_time", "asc")
      .where("reservation_date", reservation_date);
  }
}

function create(reservation) {
  return knex(tableName)
    .insert(reservation)
    .returning("*")
    .then((createdRecords) => createdRecords[0]);
}

module.exports = {
  list,
  create,
};
