const { Wine, User, Reviews } = require("../models");

exports.getReviews = async (req, res) => {
  const { wineId } = req.params;
  try {
    const reviews = await Reviews.findAll({ where: { wineId } });
    const items = reviews.map(async (e) => {
      const { review, rating, wineId } = e;
      const { name, lastname, email } = await e.getUser();
      return { review, rating, name, lastname, email, wineId };
    });
    const arrayPromises = await Promise.all(items);
    res.send(arrayPromises);
  } catch (error) {
    res.sendStatus(500);
  }
};

exports.addReview = async (req, res) => {
  const { email, id_wine, ...review } = req.body;
  try {
    const createReview = await Reviews.create(review);
    const user = await User.findOne({
      where: {
        email,
      },
    });
    if (!user) return res.status(404).send("User not found");
    const wine = await Wine.findByPk(id_wine);
    if (!wine) return res.status(404).send("Wine not found");
    //Revision si el usuario ya comento este vino
    const searchView = await Reviews.findOne({
      where: {
        userId: user.id,
        wineId: wine.id,
      },
    });
    if (searchView)
      return res.status(400).send("User already commented on this wine");

    await createReview.setUser(user);
    await createReview.setWine(wine);
    //await wine.addUserReview(review)
    res.sendStatus(200);
  } catch (error) {
    res.statusCode(500);
  }
};
