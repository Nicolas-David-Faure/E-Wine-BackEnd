const {
  getAddressService,
  postAddressService,
  getPaymentService,
  postPaymentService,
  deleteAddressService,
  deletePaymentService,
} = require("../services/checkout.service");

exports.getAddress = async (req, res) => {
  try {
    const addressList = await getAddressService(req);
    res.status(200).send(addressList);
  } catch (error) {
    switch (error.message) {
      case "Usuario no encontrado":
        res.status(404).send(error.message);
        break;
      default:
        res.status(500).send("Internal server error");
        break;
    }
  }
};
exports.deleteAddress = async (req, res) => {
  try {
    await deleteAddressService(req);
    res.sendStatus(200);
  } catch (error) {
    switch (error.message) {
      case "Address not delete":
        res.status(400).send(error.message);
        break;
      default:
        res.status(500).send("Internal server error");
        break;
    }
  }
};
exports.postAddress = async (req, res) => {
  try {
    const userAddress = await postAddressService(req);
    res.status(201).send(userAddress);
  } catch (error) {
    switch (error.message) {
      case "Usuario no encontrado":
        res.status(404).send(error.message);
        break;
      case "Error al crear Address":
        res.status(400).send(error.message);
        break;
      case "Error al establecer relacion":
        res.status(400).send(error.message);
        break;
      default:
        res.status(500).send("Internal server error");
        break;
    }
  }
};
exports.getPayment = async (req, res) => {
  try {
    const allPayments = await getPaymentService(req);
    res.status(200).send(allPayments);
  } catch (error) {
    switch (error.message) {
      case "Usuario no encontrado":
        res.status(404).send(error.message);
        break;
      default:
        res.status(500).send("Internal server error");
        break;
    }
  }
};
exports.deletePayment = async (req, res) => {
  try {
    await deletePaymentService(req);
    res.status(200).send("Payment Delete");
  } catch (error) {
    switch (error.message) {
      case "Payment not delete":
        res.status(400).send(error.message);
        break;
      default:
        res.status(500).send("Internal server error");
        break;
    }
  }
};
exports.postPayment = async (req, res) => {
  try {
    const userPayment = await postPaymentService(req);
    res.status(201).send(userPayment);
  } catch (error) {
    switch (error.message) {
      case "Usuario no encontrado":
        res.status(404).send(error.message);
        break;
      case "Error al crear payment":
        res.status(400).send(error.message);
        break;
      case "Error al establecer relacion":
        res.status(400).send(error.message);
        break;
      default:
        res.status(500).send("Internal server error");
        break;
    }
  }
};
