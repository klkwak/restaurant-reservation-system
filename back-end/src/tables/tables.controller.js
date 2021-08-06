const service = require("./tables.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/hasProperties");
const readReservation = require("../reservations/reservations.service").read;

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

function tableNameMoreThanOneCharacter(req, res, next) {
  if (req.body.data.table_name.length < 2) {
    next({
      status: 400,
      message: "table_name must be longer than 1 character",
    });
  }

  next();
}

async function create(req, res) {
  const data = await service.create(req.body.data);
  res.status(201).json({ data });
}

async function tableExists(req, res, next) {
  const tableId = parseInt(req.params.table_id);

  const table = await service.read(tableId);

  if (!table) {
    next({
      status: 404,
      message: `table with id ${tableId} does not exist`,
    });
  }

  res.locals.table = table;
  next();
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

async function reservationExists(req, res, next) {
  const { reservation_id } = req.body.data;

  const reservation = await readReservation(parseInt(reservation_id));

  if (!reservation) {
    next({
      status: 404,
      message: `reservation_id ${reservation_id} does not exist`,
    });
  }

  res.locals.reservation = reservation;
  next();
}

function reservationNotLargerThanTableCapacity(req, res, next) {
  const { capacity } = res.locals.table;

  const reservation = res.locals.reservation;

  if (reservation.people > capacity) {
    next({
      status: 400,
      message: "reservation size is larger than table capacity",
    });
  }

  next();
}

function hasDataProperty(req, res, next) {
  if (!req.body.data) {
    next({
      status: 400,
      message: "data is missing",
    });
  }

  next();
}

function hasRequiredReservationId(req, res, next) {
  const { reservation_id } = req.body.data;

  if (!reservation_id) {
    next({
      status: 400,
      message: "reservation_id is missing",
    });
  }

  res.locals.reservation_id = reservation_id;

  next();
}

async function update(req, res) {
  const table_id = parseInt(req.params.table_id);

  const { reservation_id } = res.locals;

  const data = await service.update(table_id, parseInt(reservation_id));

  res.status(200).json({ data });
}

function tableOccupied(req, res, next) {
  if (!res.locals.table.reservation_id) {
    next({
      status: 400,
      message: "table is not occupied",
    });
  }

  next();
}

async function destroy(req, res) {
  const data = await service.destroy(parseInt(res.locals.table.table_id));

  res.status(200).json({ data });
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  read: [asyncErrorBoundary(tableExists), read],
  create: [
    hasRequiredProperties,
    tableNameMoreThanOneCharacter,
    asyncErrorBoundary(create),
  ],
  update: [
    hasDataProperty,
    hasRequiredReservationId,
    tableExists,
    tableNotOccupied,
    reservationExists,
    reservationNotLargerThanTableCapacity,
    asyncErrorBoundary(update),
  ],
  delete: [tableExists, tableOccupied, asyncErrorBoundary(destroy)],
};
