const User = require("./User");
const Wine = require("./Wine");
const Cart = require("./Cart");
const Address = require("./Address");
const Payment = require("./Payment");
const History = require("./History");
const Reviews = require("./Reviews");

// Relacion con Cart

User.belongsToMany(Wine, { through: Cart });
Wine.belongsToMany(User, { through: Cart });
Cart.belongsTo(Wine);
Cart.belongsTo(User);
/* 
tabla
id pk
score string
review string
id_user fk
id_wine fk
*/

Address.belongsTo(User, { as: "user" });

// Relacion Usuario con Payment
Payment.belongsTo(User, { as: "user" });

//REVIEWS
Reviews.belongsTo(User, { as: "user" });
Reviews.belongsTo(Wine, { as: "wine" });
//Wine.hasMany(Reviews, { as: "wine" });

module.exports = { User, Wine, Cart, Payment, History, Address, Reviews };
