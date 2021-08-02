const knex = require("../db/connection");
const tableName = "tables";

// tables only has table_name and capacity

function list(reservation_date) {
  // if (!reservation_date) {
  //   return knex(tableName)
  //     .select("*")
  //     .orderBy("reservation")
  // } else {
  //   return knex(tableName)
  // }
}

function create(table) {
  return knex(tableName)
    .insert(table)
    .returning("*")
    .then((createdRecords) => createdRecords[0]);
}

module.exports = {
  list,
  create,
};
