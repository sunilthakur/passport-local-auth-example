"use strict";
var fs = require('fs');
var path = require('path');
var Sequelize = require('sequelize');
var lodash = require('lodash');
var config = {
    dialect: "sqlite",
    storage: "./db.development.sqlite"
}

var basename = path.basename(module.filename);
var sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
);

var initModels = function () {
    var db = {};
    fs
        .readdirSync(__dirname)
        .filter(function (file) {
            return (file.indexOf('.') !== 0) && (file !== basename);
        })
        .forEach(function (file) {
            var model = sequelize['import'](path.join(__dirname, file));
            db[model.name] = model;
        });
  
    Object.keys(db).forEach(function (modelName) {
        if ('associate' in db[modelName]) {
            db[modelName].associate(db);
        }
    });
    return db;
};

module.exports = lodash.extend({
    sequelize: sequelize,
    Sequelize: Sequelize
}, initModels());

