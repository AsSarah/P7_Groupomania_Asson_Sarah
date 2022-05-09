const env = require("./env.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(env.database, env.username, env.password, {
  host: env.host,
  dialect: env.dialect,
  operatorsAliases: false,

  pool: {
    max: env.max,
    min: env.pool.min,
    acquire: env.pool.acquire,
    idle: env.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//Models/tables
db.users = require("../models/User")(sequelize, Sequelize);
db.post = require("../models/Post")(sequelize, Sequelize);
db.like = require("../models/likes")(sequelize, Sequelize);
db.coms = require("../models/commentaires")(sequelize, Sequelize);
// db.posts = require("../models/")(sequelize, Sequelize);

module.exports = db;
