// Importando módulos

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// Inicializando módulos
const app = express();

// Importando rotas
const getCryptoPrice = require("./routes/getCryptoPrice");
const insertCrypto = require("./routes/insertCrypto");
const userFunctions = require("./routes/userFunctions");

// Middlewares
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Rota para consumo da API
app.use("/", getCryptoPrice);

// Rota para adicionar/remover monitoramento de moeda
app.use("/", insertCrypto);

// Rota para adicionar/remover usuário
app.use("/user", userFunctions);

app.listen(3001, () => {
    console.log("Servidor em funcionamento...");
});