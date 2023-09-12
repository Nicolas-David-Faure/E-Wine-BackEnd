const User = require("./User");

const Wine = require("./Wine");

const Cart = require("./Cart");

const Payment = require("./Payment");

const History = require("./History");

// Relacion con Cart
User.belongsToMany(Wine, { through: Cart });
Wine.belongsToMany(User, { through: Cart });
Cart.belongsTo(Wine);
Cart.belongsTo(User);

// Relacion Usuario con Payment
Payment.belongsTo(User, { as: "user" });

// Relacion con History
History.belongsTo(Cart, { as: "cart" });

module.exports = { User, Wine, Cart, Payment, History };
