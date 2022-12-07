const knex = require("../knex");

const fields = [
  "id",
  "warehouse_name",
  "address",
  "city",
  "country",
  "contact_name",
  "contact_position",
  "contact_phone",
  "contact_email",
];

exports.index = (_req, res) => {
  const p = knex.select(...fields).from("warehouses");

  p.then((data) => {
    return res.status(200).json(data);
  });
};

exports.singleWarehouse = (req, res) => {
  return knex
    .select(...fields)
    .from("warehouses")
    .where({ id: req.params.id })
    .then((data) => {
      if (!data.length) {
        return res.status(404).send({
          statusCode: 404,
          message: `Resource with id ${req.params.id} not found`,
        });
      }

      return res.status(200).json(data[0]);
    });
};