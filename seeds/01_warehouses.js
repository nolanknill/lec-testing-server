const warehouses = require("./data/warehouses");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("warehouses")
    .del()
    .then(() => {
      return knex("warehouses").insert(warehouses);
    });
};
