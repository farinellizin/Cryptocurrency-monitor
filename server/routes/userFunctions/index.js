// Importando módulos
const express = require("express");

// Inicializando módulos
const router = express.Router();

// Importando Banco de Dados
const db = require("../../config/database").databaseConnection;

// Adicionar novo usuário
router.post("/add", (req, res) => {
    const username = 'ygor'

    const query = `INSERT INTO user (username) VALUES (?)`;

    db.query(query, [username], (err1, res1) => {
        if (err1) {
            if (err1.code === "ER_DUP_ENTRY") {
                res.status(500).send("O usuário já existe");
            } else {
                res.status(500).send("Ocorreu um erro interno do servidor")
            }

            console.log(err1);
            return;
        }

        res.status(200).send("Usuário cadastrado com sucesso.");
    })
})

module.exports = router;