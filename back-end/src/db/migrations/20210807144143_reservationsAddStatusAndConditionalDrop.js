const { dropColumn } = require("../dbHelper");

exports.up = function (knex) {
  return knex.schema.table("reservations", (table) => {
    table.string("status").notNullable().defaultTo("booked");
  });
};

exports.down = function (knex) {
  return dropColumn(knex, "reservations", "status");
};
