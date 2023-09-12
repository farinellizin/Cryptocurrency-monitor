// Importando módulos
const express = require("express");

// Inicializando módulos
const router = express.Router();

// Importando Banco de Dados
const db = require("../../config/database").databaseConnection;

// Adicionando Criptomoeda a rede de monitoramento
router.post("/addNewCrypto", (req, res) => {
    const username = req.body.username;
    const coin = req.body.coin;

    const queryVerifyUser = `SELECT username FROM user WHERE username = ?`;
    const verifyDuplicate = `SELECT COUNT(*) AS cont FROM user_preferences WHERE username = ? AND coin = ?`;
    const queryNewCrypto = `INSERT INTO user_preferences (username, coin) VALUES (?, ?)`;

    db.query(queryVerifyUser, [username], (err1, res1) => {
        if (err1) {
            res.status(500).send("Ocorreu um erro interno do servidor.");
            console.log(err1);
            return;
        }

        if (res1.length > 0) {
            db.query(verifyDuplicate, [username, coin], (err3, res3) => {
                if (err3) {
                    res.status(500).send("Ocorreu um erro interno do servidor.");
                    console.log(err3);
                    return;
                }

                if (res3[0].cont === 0) {
                    db.query(queryNewCrypto, [username, coin], (err2, res2) => {
                        if (err2) {
                            res.status(500).send("Ocorreu um erro interno do servidor.");
                            console.log(err2);
                            return;
                        }

                        res.status(200).redirect('/');
                    })

                } else {
                    res.status(500).send("Usuário e moeda já cadastrados");
                    console.log("Moeda e usuário repetido");
                    return;
                }
            })
        } else {
            res.status(500).send("O usuário não existe no sistema");
            console.log("O usuário não existe no sistema.");
            return;
        }
    })
})

module.exports = router;