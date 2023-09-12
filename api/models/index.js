const User = require("./User");

const Wine = require("./Wine");

const Cart = require("./Cart");

const Address = require("./Address");

User.belongsToMany(Wine, { through: Cart });
Wine.belongsToMany(User, { through: Cart });
Cart.belongsTo(Wine);
Cart.belongsTo(User);

Address.belongsTo(User, { as: "user" });

/* History.belongsTo(Cart);
History.belongsTo(User); */

module.exports = { User, Wine, Cart, Address };
