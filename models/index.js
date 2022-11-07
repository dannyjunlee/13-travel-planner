const Location = require('./Location');
const Traveller = require('./Traveller');
const Trips = require('./Trips');

Traveller.belongsToMany(Location, { through: Trips, unique: false });
Location.belongsToMany(Traveller, { through: Trips, unique: false });

module.exports = {
  Location,
  Traveller,
  Trips
};
