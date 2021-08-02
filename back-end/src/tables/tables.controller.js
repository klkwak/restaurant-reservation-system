const service = require("./tables.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/hasProperties");

const hasRequiredProperties = hasProperties("table_name", "capacity");

async function list(req, res) {
  const data = await service.list(req.query.date);
  res.json({ data });
}

async function create(req, res) {
  const data = await service.create(req.body.data);
  res.status(201).json({ data });
}

module.exports = {
  list,
  create: [hasRequiredProperties, asyncErrorBoundary(create)],
};
