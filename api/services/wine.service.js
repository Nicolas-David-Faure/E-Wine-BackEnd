const { Wine } = require("../models");
async function getAllWines() {
  try {
    return await Wine.findAll();
  } catch (error) {
    throw new Error("There are no wines");
  }
}
async function getWineById(req) {
  const id = req.params.id;
  const wine = await Wine.findByPk(id);
  if (!wine) throw new Error("There is no such wine");
  return wine;
}

async function PostaddWine(req) {
  const createdWine = await Wine.create(req.body);
  if (!createdWine) throw new Error("Error creating item");
  return createdWine;
}
async function deleteWineId(req) {
  const { id } = req.params;
  const delete_cart = await Wine.destroy({ where: { id } });
  if (delete_cart != 1) throw new Error("There is no elimination");
  return;
}
async function updateWineId(req) {
  const { id } = req.params;
  const wineToUpdate = await Wine.findByPk(id);
  if (!wineToUpdate) throw new Error("Wine not found");
  const wineUpdate = await wineToUpdate.update(req.body);
  if (!wineUpdate) throw new Error("Wine not update");
  return wineUpdate;
}
module.exports = {
  getAllWines,
  getWineById,
  PostaddWine,
  deleteWineId,
  updateWineId,
};
