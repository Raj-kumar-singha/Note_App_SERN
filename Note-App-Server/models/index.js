let db = require('./connection');
const obj = {
    notes: require('../models/schema/notes')(db.sequelize, db.DataTypes),
};

obj.sequelize = db.sequelize;

module.exports = obj;