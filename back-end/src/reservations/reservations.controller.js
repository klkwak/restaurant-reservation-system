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
    next({
      status: 400,
      message: "people property must be a number",
    });
  }
}

function reservationDateFormatted(req, _, next) {
  let regEx = /^\d{4}-\d{2}-\d{2}$/;
  let stored = req.body.data.reservation_date.match(regEx) != null;
  if (stored) next();
  else {
    next({
      status: 400,
      message: "reservation_date must be in correct format: YYYY/MM/DD",
    });
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
    next({
      status: 400,
      message: "reservation_time must be in correct format: HH:MM:SS",
    });
  }
}

function formatAsDateTimeInstance(dateString, timeString) {
  let dateParts = dateString.split("-");

  dateParts = dateParts.map((part) => parseInt(part));

  let timeParts = timeString.split(":");

  timeParts = timeParts.map((part) => parseInt(part, 10));

  return new Date(
    dateParts[0],
    dateParts[1] - 1,
    dateParts[2],
    timeParts[0],
    timeParts[1],
    0,
    0
  );
}

function reservationDateNotTuesday(req, _, next) {
  const date = formatAsDateTimeInstance(
    req.body.data.reservation_date,
    req.body.data.reservation_time
  );

  if (date.getDay() === 2) {
    next({
      status: 400,
      message: "the restaurant is closed on Tuesdays",
    });
  }

  next();
}

function reservationDateNotInPast(req, _, next) {
  const date = formatAsDateTimeInstance(
    req.body.data.reservation_date,
    req.body.data.reservation_time
  ).getTime();

  const today = new Date().getTime();

  if (date < today) {
    next({
      status: 400,
      message: "reservations cannot be made for past dates",
    });
  }

  next();
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
    reservationDateNotTuesday,
    reservationDateNotInPast,
    asyncErrorBoundary(create),
  ],
};
