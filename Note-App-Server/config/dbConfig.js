require('dotenv').config();

const config = {
    DB_Name: process.env.DB_NAME || "notes_app",
    DB_Username: process.env.DB_USER || "root",
    DB_Password: process.env.DB_PASSWORD || "",
    options: {
        host: process.env.DB_HOST || "localhost",
        dialect: "mysql",
        logging: false,
        timezone: '+05:30'
    }
};

module.exports = config;
