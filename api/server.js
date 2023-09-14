const express = require("express"); // requerir el modulo express
const app = express(); // guardar su export en una variable
const morgan = require("morgan"); // Morgan intercepta todos los requests y loguea un resumen del pedido cada vez que un cliente se comunica con el servidor. Entre otras cosas, loguea el método (los verbos) y la ruta entrante.
const cookieParser = require("cookie-parser");
const cors = require("cors");

const db = require("./db/index");
const routes = require("./routes");
const models = require("./models");
const { seederWine, seederSuperAdminUser } = require("./helpers/sedear");

//seederWine();
//seederSuperAdminUser();
const port = 8080;

app.use(morgan("tiny")); // version simplificada de morgan

app.use(express.json()); // Returns middleware that only parses json and only looks at requests where the Content-Type header matches the type option. Analiza las requests entrantes con cargas JSON y se basa en body-parser.
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

app.use("/api", routes);

db.sync({ force: false })
  .then(() => {
    app.listen(port, () => console.log(`listening on port ${port}`));
  })
  .catch(console.error);
