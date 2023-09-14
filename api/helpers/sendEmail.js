const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    // TODO: replace user and pass values from https://forwardemail.net/
    user: "ewine.super@gmail.com",
    pass: "rlkl quti yjer glyq",
  },
});

// async..await is not allowed in global scope, must use a wrapper
async function sendEmail(body_email, name, email) {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: "ewine.super@gmail.com", // sender address
    to: `${email}`, // list of receivers
    subject: "🍷 Gracias por tu compra en E-wine 🍷", // Subject line
    html: `<b>
    <h1>¡Gracias por tu compra!</h1>
    <p>Estimado/a ${name},</p>
    <p>
      Hemos recibido tu pedido con éxito. A continuación, te proporcionamos
      los detalles de tu compra:
    </p>

    <h2>Detalles de la compra</h2>
    <ul>
      ${body_email}
    </ul>

    <p>
      Si tienes alguna pregunta o necesitas asistencia adicional, no dudes
      en ponerte en contacto con nuestro equipo de soporte.
    </p>

    <p>¡Esperamos que disfrutes de tu compra!</p>

    <p>Atentamente,</p>
    <p>El equipo de E-Wine</p>
  </b>`, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  //
  // NOTE: You can go to https://forwardemail.net/my-account/emails to see your email delivery status and preview
  //       Or you can use the "preview-email" npm package to preview emails locally in browsers and iOS Simulator
  //       https://github.com/forwardemail/preview-email
  //
}

module.exports = sendEmail;
