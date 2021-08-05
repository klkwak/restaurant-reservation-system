const service = require("./tables.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/hasProperties");
const readReservation = require("../reservations/reservations.service").read;
const P = require("pino");

const hasRequiredProperties = hasProperties("table_name", "capacity");

async function list(req, res) {
  const data = await service.list();
  res.json({ data });
}

// async function read(req, res) {
//   const table_id = parseInt(req.params.table_id);

//   const data = await service.read(table_id);

//   res.locals.tableCapacity = data.capacity;
//   res.locals.tableStatus = data.reservation_id;

//   res.json({ data });
// }

async function create(req, res) {
  const data = await service.create(req.body.data);
  res.status(201).json({ data });
}

async function tableExists(req, res, next) {
  const tableId = parseInt(req.params.table_id);

  const table = await service.read(tableId);

  if (table) {
    res.locals.table = table;
    return next();
  } else {
    next({
      status: 404,
      message: "table does not exist",
    });
  }
}

function read(req, res, next) {
  const { table: data } = res.locals;

  res.json({ data });
}

function tableNotOccupied(req, res, next) {
  if (res.locals.table.reservation_id) {
    next({
      status: 400,
      message: "table is already occupied",
    });
  }

  next();
}

async function reservationNotLargerThanTableCapacity(req, res, next) {
  const { capacity } = res.locals.table;

  const { reservation_id } = req.body.data;

  console.log(reservation_id);

  const reservation = await readReservation(parseInt(reservation_id));

  console.log(capacity, reservation);

  if (reservation.people > capacity) {
    next({
      status: 400,
      message: "reservation size is larger than table capacity",
    });
  }

  next();
}

async function update(req, res) {
  const table_id = parseInt(req.params.table_id);

  const { reservation_id } = req.body.data;

  const data = await service.update(table_id, parseInt(reservation_id));
  res.status(200).json({ data });
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  read: [asyncErrorBoundary(tableExists), read],
  create: [hasRequiredProperties, asyncErrorBoundary(create)],
  update: [
    tableExists,
    tableNotOccupied,
    reservationNotLargerThanTableCapacity,
    asyncErrorBoundary(update),
  ],
};
