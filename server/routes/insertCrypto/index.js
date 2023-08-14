// Importando módulos
const express = require("express");

// Inicializando módulos
const router = express.Router();

// Importando Banco de Dados
const db = require("../../config/database").databaseConnection;

// Adicionando Criptomoeda a rede de monitoramento
router.post("/addNewCrypto", (req, res) => {
    const username = 'farinellizin';
    const coin = 'BNB';

    const queryVerifyUser = `SELECT username FROM user WHERE username = ?`;
    const queryNewCrypto = `INSERT INTO user_preferences (username, coin) VALUES (?, ?)`;

    db.query(queryVerifyUser, [username], (err1, res1) => {
        if (err1) {
            res.status(500).send("Ocorreu um erro interno do servidor.");
            console.log(err1);
            return;
        }

        console.log(res1.length);

        if (res1.length > 0) {
            db.query(queryNewCrypto, [username, coin], (err2, res2) => {
                if (err2) {
                    res.status(500).send("Ocorreu um erro interno do servidor.");
                    console.log(err2);
                    return;
                }

                res.status(200).send("Criptomoeda adicionada com sucesso.");
            })

        } else {
            res.status(500).send("O usuário não existe no sistema");
            console.log("O usuário não existe no sistema.");
            return;
        }
    })
})

module.exports = router;