# Periodic Tables: Restaurant Reservation System

## Summary

Periodic Tables is a full stack reservation system for fine dining restaurants. This software would be used internally by restaurant staff when a customer calls to request a reservation.

This project was built with JavaScript, React.js, HTML, CSS, Bootstrap, Node.js, Express, and PostgreSQL. The API is RESTful and can execute all CRUDL operations.

This repository is set up as a monorepo, meaning that the frontend and backend projects are in one repository. 

## Installation

1. Clone this repository.
   ```git clone https://github.com/kyrakwak/restaurant-reservation-system.git```
2. Navigate to the repository locally.
   ```cd restaurant-reservation-system```
4. Run `npm install` to install project dependencies.
5. Run `npm run start:dev` to start the client and server concurrently.

If you have trouble getting the server to run, feel free to reach out for help!

## Application navigation

The table below describes the paths for navigating the application:

| URL Endpoint | Description                                                      |
| ---------------- | ---------------------------------------------------------------- |
| `/dashboard`     | Application homepage, will display today's reservations by default.  |
| `/dashboard/?date=YYYY-MM-DD`    | Displays reservations for a specific date. |
| `/reservations`    | Redirects to dashboard/homepage. |
| `/reservations/new`    | Create a new reservation. |
| `/reservations/:reservation_id/seat`    | Seat a reservation at a table. |
| `/reservations/:reservation_id/edit`    | Edit an existing reservation. |
| `/tables/new`    | Create a new table. |
| `/search `    | Search for reservations by phone number. |

## API documentation

All GET requests return a JSON response. All POST/PUT requests require an application/json body, and return a JSON response.

### Endpoints for reservations

**List all reservations for one date**: `GET /reservations?date=YYYY-MM-DD`
- Gets all reservations for reservation date query
- Successful GET request will return an array of JSON objects representing each reservation, each containing the following fields:
   - `reservation_id`: integer
   - `first_name`: string
   - `last_name`: string
   - `mobile_number`: string (formatted 000-000-0000)
   - `reservation_date`: string (formatted YYYY-MM-DDT00:00:00.000Z)
   - `reservation_time`: string (formatted HH:MM:SS)
   - `people`: integer
   - `created_at`: string (formatted YYYY-MM-DDT00:00:00.000Z)
   - `updated_at`: string (formatted YYYY-MM-DDT00:00:00.000Z)
   - `status`: string

**Create a reservation**: `POST /reservations or /reservations?date=YYYY-MM-DD`
- Posts one reservation
- Post body must contain `first_name`, `last_name`, `mobile_number`, `reservation_date`, `reservation_time`, `people` (see above for data types)
- Database will then create `reservation_id`, `created_at`, `updated_at` and `status` fields (`status` defaults to "booked")
- Successful POST request will return JSON of the posted reservation

**Get one reservation**: `GET /reservations/:reservation_id`
- Gets one reservation based on `reservation_id` parameter
- Successful GET request will return JSON of the reservation

**Update one reservation**: `PUT /reservations/:reservation_id`
- Updates one reservation based on `reservation_id` parameter
- Request body must contain same fields as POST request (above)
- Successful PUT request will return JSON of the updated reservation

**Update one reservation's status**: `PUT /reservations/:reservation_id/status`
- Updates `status` of one reservation based on `reservation_id` parameter
- Request body must contain a `status` key with a string value
- Successful PUT request will return JSON of the updated reservation

### Endpoints for tables

**List all tables**: `GET /tables`
- Gets all tables
- Successful GET request will return an array of JSON objects representing each table, each containing the following fields:
   - `table_id`: integer
   - `table_name`: string
   - `capacity`: integer
   - `created_at`: string (formatted YYYY-MM-DDT00:00:00.000Z)
   - `updated_at`: string (formatted YYYY-MM-DDT00:00:00.000Z)
   - `reservation_id`: integer

**Create a table**: `POST /tables`
- Posts one table
- Post body must contain `table_name` and `capacity` (see above for data types)
- Database will then create `table_id`, `created_at`, `updated_at` and `reservation_id` fields (`reservation_id` defaults to null)
- Successful POST request will return JSON of the posted table

**Get one table**: `GET /tables/:table_id`
- Gets one table based on table_id parameter
- Successful GET request will return JSON of the table

**Update one table's reservation assignment**: `PUT /tables/:table_id/seat`
- Updates `reservation_id` of one table based on `table_id` parameter
- Request body must contain a `reservation_id` key with a string value
- Successful PUT request will return JSON of the updated table

**Delete one table's reservation assignment**: `DELETE /tables/:table_id/seat`
- Deletes one table's `reservation_id` (by reverting it to null) based on `table_id` parameter
- Will also make PUT request to `/reservations/:reservation_id/status` to update reservation `status` to "finished"
- Successful DELETE request will return JSON of the updated table

## Technology

**Frontend**: JavaScript, React.js (including Router), HTML, CSS, Bootstrap

**Backend**: Node.js, Express, PostgreSQL

**Other tools used**: Jest, Postman, DBeaver, ElephantSQL, Knex

## Screenshots

**Dashboard**
<img width="1532" alt="Screen Shot 2021-08-12 at 6 38 01 PM" src="https://user-images.githubusercontent.com/73764394/129279036-30703b63-17cc-48ae-b276-d541e0d88fc9.png">

**Create a reservation**
<img width="1528" alt="Screen Shot 2021-08-12 at 6 39 02 PM" src="https://user-images.githubusercontent.com/73764394/129279057-6feb7762-6cc0-4c37-9992-f4a721d47709.png">

**Create a table**
<img width="1529" alt="Screen Shot 2021-08-12 at 6 39 11 PM" src="https://user-images.githubusercontent.com/73764394/129279077-9406d278-e120-4be2-9f44-b203f648d8e3.png">

**Edit a reservation**
<img width="1527" alt="Screen Shot 2021-08-12 at 6 39 25 PM" src="https://user-images.githubusercontent.com/73764394/129279086-e7b53b4d-f7e9-411d-9d4e-10bd4e408141.png">

**Seat a reservation at a table**
<img width="1526" alt="Screen Shot 2021-08-12 at 6 39 34 PM" src="https://user-images.githubusercontent.com/73764394/129279095-5664fd79-d7c0-47ec-b8a2-0b2318213f86.png">

**Search reservations by phone number**
<img width="1531" alt="Screen Shot 2021-08-12 at 6 38 47 PM" src="https://user-images.githubusercontent.com/73764394/129279111-916816f5-6f63-42b7-b78e-cf556c67c70f.png">
