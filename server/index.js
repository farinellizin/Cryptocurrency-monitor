// Importando módulos

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// Inicializando módulos
const app = express();

// Importando rotas
const getCryptoPrice = require("./routes/getCryptoPrice");

// Middlewares
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Rota para consumo da API
app.use("/", getCryptoPrice);

app.listen(3001, () => {
    console.log("Servidor em funcionamento...");
});