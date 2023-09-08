const S = require("sequelize");
const db = require("../db/index");
const Wine = require("./Wine");

class Cart extends S.Model {
  incrementCount = async function () {
    this.count += 1;
    this.amount = this.count * (await this.getWine()).price;
    await this.save();
  };

  decrementCount = async function () {
    if (this.count > 1) {
      this.count -= 1;
      this.amount = this.count * (await this.getWine()).price;
      await this.save();
    }
  };
}

Cart.init(
  {
    date: {
      type: S.DATE,
    },
    state: {
      type: S.BOOLEAN,
      defaultValue: false,
    },
    amount: {
      // monto total
      type: S.DECIMAL,
      defaultValue: 0,
    },
    count: {
      // cantidad de items
      type: S.INTEGER,
      defaultValue: 1,
    },
  },
  { sequelize: db, modelName: "carts" }
);

// Esto maneja que si estoy agregando al carrito un item que previamente ya agregue, que en el carrito me incremente en 1 la cantidad de ese item (count).
Cart.beforeCreate(async (cartInstance) => {
  const { userId, wineId } = cartInstance;

  const existingWine = await Cart.findOne({
    where: { userId, wineId },
  });

  if (existingWine) {
    existingWine.count += 1;
    existingWine.amount =
      existingWine.count * (await existingWine.getWine()).price; //  getWine es una funcion que provee sequelize por las relaciones que hay entre Cart y Wine
    await existingWine.save();
    throw new Error(
      "Registro existente, se ha incrementado la cantidad en el carrito."
    );
  }
});

module.exports = Cart;
