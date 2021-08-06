const knex = require("../db/connection");
const tableName = "tables";

function list() {
  return knex(tableName).select("*").orderBy("table_name", "asc");
}

function read(table_id) {
  return knex(tableName).select("*").where({ table_id }).first();
}

function create(table) {
  return knex(tableName)
    .insert(table)
    .returning("*")
    .then((createdRecords) => createdRecords[0]);
}

function update(table_id, reservation_id) {
  return knex(tableName)
    .update({ reservation_id })
    .where({ table_id })
    .then((updatedRecords) => updatedRecords[0]);
}

function destroy(table_id) {
  return knex(tableName)
    .update("reservation_id", null)
    .where({ table_id })
    .then((updatedRecords) => updatedRecords[0]);
}

module.exports = {
  list,
  read,
  create,
  update,
  destroy,
};
