const User = require("./User");

const Wine = require("./Wine");

const Cart = require("./Cart");

User.belongsToMany(Wine, { through: Cart });
Wine.belongsToMany(User, { through: Cart });

Cart.belongsTo(Wine);
Cart.belongsTo(User);

module.exports = { User, Wine, Cart };
