const mysql = require('mysql2');

// * Change this to your server config for fetching/storing data on remote server instead
const {dBConfig} = require('./config/local/db.config.js');
// const dBConfig = require('./config/server/{dev/stage/prod}/db.config.json');

const pool =mysql.createPool(
    dBConfig
);
module.exports=pool.promise();