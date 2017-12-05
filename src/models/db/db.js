const pgp = require("pg-promise")();
const { Map } = require('immutable');
const config = require("../../config/config").getConfig();

const connectionObject = {
  host: config.get("db").get("host"),
  port: config.get("db").get("port"),
  database: config.get("db").get("name"),
  user: config.get("db").get("user"),
  password: config.get("db").get("password")
};
 //write a function to check to see if my connection object is valid- if host, for example, is undefined, it still works and does not throw an error below

const db = pgp(connectionObject);

//check to see if we can connect to the db. If not, catch an error
db.connect()
    .then(obj => {
        console.log("db is connected");
        obj.done(); // success, release the connection;
    })
    .catch(error => {
        console.log('ERROR:', error.message || error);
    });

module.exports = db;
