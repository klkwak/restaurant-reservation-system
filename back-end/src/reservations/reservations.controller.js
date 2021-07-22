const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/hasProperties");

const hasRequiredProperties = hasProperties(
  "first_name",
  "last_name",
  "mobile_number",
  "reservation_date",
  "reservation_time",
  "people"
);
/**
 * List handler for reservation resources
 */
async function list(req, res) {
  const data = await service.list(req.query.date);
  res.json({ data });
}

function peoplePropertyIsNumber(req, _, next) {
  if (typeof req.body.data.people === "number") next();
  else {
    const error = new Error("people property must be a number");
    error.status = 400;
    throw error;
  }
}

function reservationDateFormatted(req, _, next) {
  let regEx = /^\d{4}-\d{2}-\d{2}$/;
  let stored = req.body.data.reservation_date.match(regEx) != null;
  if (stored) next();
  else {
    const error = new Error(
      `reservation_date must be in correct format: YYYY/MM/DD`
    );
    error.status = 400;
    throw error;
  }
}

function reservationTimeFormatted(req, _, next) {
  let regEx = /^(?:2[0-3]|[01]?[0-9]):[0-5][0-9]:[0-5][0-9]$/;
  let regEx2 = /^(?:2[0-3]|[01]?[0-9]):[0-5][0-9]$/;
  let regEx3 = /^(?:2[0-3]|[01]?[0-9])/;
  let stored = req.body.data.reservation_time.match(regEx) != null;
  let stored2 = req.body.data.reservation_time.match(regEx2) != null;
  let stored3 = req.body.data.reservation_time.match(regEx3) != null;
  if (stored || stored2 || stored3) next();
  else {
    const error = new Error(
      `reservation_time must be in correct format: HH:MM:SS`
    );
    error.status = 400;
    throw error;
  }
}

async function create(req, res) {
  const data = await service.create(req.body.data);
  res.status(201).json({ data });
}

module.exports = {
  list,
  create: [
    hasRequiredProperties,
    peoplePropertyIsNumber,
    reservationDateFormatted,
    reservationTimeFormatted,
    asyncErrorBoundary(create),
  ],
};
