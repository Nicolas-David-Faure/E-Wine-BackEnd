const { User, Cart } = require("../models");

exports.getAllCarts = async (req, res) => {
  try {
    const carrito = await Cart.findAll();

    const carts = await Promise.all(
      carrito.map(async (item) => {
        const { ...info } = await item.getWine();
        const {
          dataValues: { id, image, price, winery, wine_type, grape, name },
        } = info;
        const {
          dataValues: { amount, count },
        } = item;
        const infoCart = {
          id,
          date: item.createdAt,
          image,
          price,
          winery,
          wine_type,
          grape,
          amount,
          count,
          name,
        };
        return infoCart;
      })
    );

    //ordenar
    const order_by = carts.sort((a, b) => {
      return a.date - b.date;
    });

    res.status(200).send(order_by);
  } catch (error) {
    res.sendStatus(500);
  }
};

exports.addCartPrice = async (req, res) => {
  const { wineId } = req.params;
  //axios.post("loca",{email:"ivan@gmail.com"},{params:{id:233}})
  const { email, price, operation = true } = req.body;

  const usuario = await User.findOne({ where: { email } });
  if (!usuario) return res.sendStatus(404);
  const user = await Cart.findOrCreate({
    where: {
      userId: usuario.id,
      wineId: wineId,
    },
    defaults: {
      amount: price,
    },
  });
  if (!user) return res.sendStatus(400);
  const [page, status] = user;

  if (!status) {
    if (operation) {
      const task = await page.increment({ count: 1, amount: price });
      if (!task) res.sendStatus(400);
      res.status(201).send("Product added and price increased");
    } else {
      if (page.count > 1) {
        const task = await page.decrement({ count: 1, amount: price });
        if (!task) res.sendStatus(400);
        res.status(201).send("Product removed and price reduction");
      }
    }
  } else {
    res.sendStatus(200);
  }
};
exports.deleteCart = async (req, res) => {
  const { wineId, email } = req.params;
  console.log(email);

  const user = await User.findOne({ where: { email } });
  if (!user) return res.status(401).send("Mail not found");

  const delete_cart = await Cart.destroy({
    where: { userId: user.id, wineId: wineId },
  });
  if (delete_cart != 1) return res.status(405).send("There is no elimination");
  res.status(200).send("Cart deleted");
};
