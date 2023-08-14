// Importando módulos
const express = require("express");
const Axios = require("axios");
const async = require('async');

// Inicializando módulos
const router = express.Router();

// Importando Banco de Dados
const db = require("../../config/database").databaseConnection;

// URL da API
const url = 'https://rest.coinapi.io/v1/exchangerate/';

// Consumir API
router.get("/getCryptoPrice", (req, res) => {
    const username = 'farinellizin';
    const responseArray = [];

    const query = `SELECT coin FROM user_preferences WHERE username = ?`;

    db.query(query, [username], (err, result) => {
        if (err) {
            res.status(500).send("Ocorreu um erro interno do servidor.");
            console.log(err);
            return;
        }

        async.eachSeries(result, async (value) => {
            try {
                const response = await Axios.get(`${url}${value.coin}/USD`, {
                    headers: {
                        "X-CoinAPI-Key": "32DC636E-8773-4344-819A-FC520889AAF7"
                    }
                });

                responseArray.push(response.data.rate);
            } catch (error) {
                console.log(error);
            }
        }, () => { res.send(responseArray) });
    });
});

module.exports = router;
