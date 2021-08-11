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
      .where("reservation_date", reservation_date)
      .whereNot("status", "finished")
      .whereNot("status", "cancelled");
  }
}

function search(mobile_number) {
  return knex(tableName)
    .whereRaw(
      "translate(mobile_number, '() -', '') like ?",
      `%${mobile_number.replace(/\D/g, "")}%`
    )
    .orderBy("reservation_date");
}

function read(reservation_id) {
  return knex(tableName).select("*").where({ reservation_id }).first();
}

function create(reservation) {
  return knex(tableName)
    .insert(reservation)
    .returning("*")
    .then((createdRecords) => createdRecords[0]);
}

function update(reservation_id, data) {
  if (typeof data === "string") {
    return knex(tableName)
      .update("status", data)
      .where({ reservation_id })
      .returning("*")
      .then((updatedRecords) => updatedRecords[0]);
  } else {
    return knex(tableName)
      .update(data)
      .where({ reservation_id })
      .returning("*")
      .then((updatedRecords) => updatedRecords[0]);
  }
}

module.exports = {
  list,
  search,
  read,
  create,
  update,
};
