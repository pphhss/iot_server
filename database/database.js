var mysql = require('mysql');

var config = require('../config');
var database = null;

function db(pool) {
    this.pool = pool;
}

db.prototype.getConnection = function (callback) {
    if (callback == null){ 
        callback = function () { };
    }
        
    // get pool
    this.pool.getConnection(function(err, connection){
        if (err) {
            throw err;
        }
        else {
            callback(connection);
        }
    });
};

//singleton
exports.intance = function () {
    
    if (database == null)
        database = new db(mysql.createPool(config.database));
    return database;
};