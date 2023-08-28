// Importando módulos
const express = require("express");

// Inicializando módulos
const router = express.Router();

// Importando Banco de Dados
const db = require("../../config/database").databaseConnection;

// Adicionar novo usuário
router.post("/add", (req, res) => {
    const username = req.body.username;

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

        res.status(200).redirect('/');
    })
});

// Remover usuário existente
router.post("/remove", (req, res) => {
    const username = req.body.username;

    const queryDeleteChildren = `DELETE FROM user_preferences WHERE username = ?`;
    const queryDeleteDad = `DELETE FROM user WHERE username = ?`;

    db.query(queryDeleteChildren, [username], (err1, res1) => {
        if (err1) {
            res.status(500).send("Ocorreu um erro interno do servidor.");
            console.log(err1);
            return;
        }

        db.query(queryDeleteDad, [username], (err2, res2) => {
            if (err2) {
                res.status(500).send("Ocorreu um erro interno do servidor.");
                console.log(err2);
                return;
            }

            res.status(200).redirect('/');
        })
    })
});

module.exports = router;