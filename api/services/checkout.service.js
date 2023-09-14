const { User, Address, Payment } = require("../models");

async function getAddressService(req) {
  const { email } = req.params;
  const user = await User.findOne({ where: { email } });
  if (!user) throw new Error("Usuario no encontrado"); //404

  const allAddress = await Address.findAll({ where: { userId: user.id } });
  return allAddress;
}
async function postAddressService(req) {
  const { email } = req.params;
  const address = req.body;

  const user = await User.findOne({ where: { email } });
  if (!user) throw new Error("Usuario no encontrado"); //404
  const createAddress = await Address.create(address);
  if (!createAddress) throw new Error("Error al crear Address"); //400
  const userAddress = await createAddress.setUser(user);
  if (!userAddress) throw new Error("Error al establecer relacion"); //400
  return userAddress;
}
async function deleteAddressService(req) {
  const { id } = req.params;
  const addressDelete = await Address.destroy({ where: { id } });
  if (addressDelete != 1) throw new Error("Address not delete"); //return res.status(400).send("Address not delete")
  return;
}
async function getPaymentService(req) {
  const { email } = req.params;
  const user = await User.findOne({ where: { email } });

  if (!user) throw new Error("Usuario no encontrado"); //404

  const allPayments = await Payment.findAll({ where: { userId: user.id } });

  return allPayments;
}
async function postPaymentService(req) {
  const { email } = req.params;
  const payment = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user) throw new Error("Usuario no encontrado"); //404

  const createPayment = await Payment.create(payment);
  if (!createPayment) throw new Error("Error al crear payment"); //400

  const userPayment = await createPayment.setUser(user);
  if (!userPayment) throw new Error("Error al establecer relacion"); //400
  return userPayment;
}
async function deletePaymentService(req) {
  const { id } = req.params;
  const paymentDelete = await Payment.destroy({ where: { id } });
  if (paymentDelete != 1) throw new Error("Payment not delete"); //return res.status(400).send("Address not delete")
  return;
}

module.exports = {
  getAddressService,
  postAddressService,
  getPaymentService,
  postPaymentService,
  deleteAddressService,
  deletePaymentService,
};
