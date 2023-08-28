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
app.use(express.static('public'));

// Home Page
app.get('/', (req, res) => {
    res.sendFile(`templates/home.html`, {root: __dirname});
});

// Adicionar usuário
app.get('/addUser.html', (req, res) => {
    res.sendFile('templates/addUser.html', {root: __dirname});
});

// Remover usuário
app.get('/removeUser.html', (req, res) => {
    res.sendFile('templates/removeUser.html', {root: __dirname});
});

// Rota para pegar o preço das criptomoedas
app.get('/usernameCrypto.html', (req, res) => {
    res.sendFile('templates/usernameCrypto.html', {root: __dirname});
});

// Adicionar crypto para um usuário
app.get('/addCrypto.html', (req, res) => {
    res.sendFile('templates/addCrypto.html', {root: __dirname});
});

// Rota para consumo da API
app.use("/", getCryptoPrice);

// Rota para adicionar/remover monitoramento de moeda
app.use("/", insertCrypto);

// Rota para adicionar/remover usuário
app.use("/userFunctions", userFunctions);

app.listen(3001, () => {
    console.log("Servidor em funcionamento...");
});