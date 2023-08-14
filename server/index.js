// Importando módulos

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// Inicializando módulos
const app = express();

// Importando rotas
const getCryptoPrice = require("./routes/getCryptoPrice");
const insertCrypto = require("./routes/insertCrypto");

// Middlewares
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Rota para consumo da API
app.use("/", getCryptoPrice);

// Rota para adicionar monitoramento de moeda
app.use("/", insertCrypto);

app.listen(3001, () => {
    console.log("Servidor em funcionamento...");
});