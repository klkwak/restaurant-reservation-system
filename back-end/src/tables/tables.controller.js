const service = require("./tables.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/hasProperties");

const hasRequiredProperties = hasProperties("table_name", "capacity");

async function list(req, res) {
  const data = await service.list();
  res.json({ data });
}

async function create(req, res) {
  const data = await service.create(req.body.data);
  res.status(201).json({ data });
}

async function update(req, res) {
  const table_id = parseInt(req.params.table_id);

  const { reservation_id } = req.body.data;

  const data = await service.update(table_id, parseInt(reservation_id));
  res.status(200).json({ data });
}

module.exports = {
  list,
  create: [hasRequiredProperties, asyncErrorBoundary(create)],
  update,
};
