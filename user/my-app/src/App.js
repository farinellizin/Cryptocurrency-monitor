import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [bitcoinPrice, setBitcoinPrice] = useState(null);
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado de autenticação
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const currencies = ['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD', 'CHF', 'SGD', 'CNY', 'HKD'];
  const topCryptos = ['BTC', 'ETH', 'XRP', 'BCH', 'LTC'];

  useEffect(() => {
    async function fetchBitcoinPrice() {
      try {
        const response = await axios.get(`https://api.coindesk.com/v1/bpi/currentprice/${selectedCurrency}.json`);
        const data = response.data;
        setBitcoinPrice(data.bpi[selectedCurrency].rate);
      } catch (error) {
        console.error('Error fetching bitcoin price:', error);
      }
    }

    fetchBitcoinPrice();
  }, [selectedCurrency]);

  // Função para fazer login
  const handleLogin = () => {
    // Simplesmente definindo isLoggedIn como true aqui
    setIsLoggedIn(true);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Bitcoin Price Tracker</h1>
        {isLoggedIn ? (
          <div>
            <p>Welcome, {username}!</p>
            <div className="currency-select-container">
              <label htmlFor="currency-select">Select Currency:</label>
              <select
                className="currency-select"
                id="currency-select"
                value={selectedCurrency}
                onChange={(event) => setSelectedCurrency(event.target.value)}
              >
                {currencies.map(currency => (
                  <option key={currency} value={currency}>{currency}</option>
                ))}
              </select>
            </div>
            <div className="crypto-list">
              {topCryptos.map(crypto => (
                <CryptoPrice key={crypto} crypto={crypto} selectedCurrency={selectedCurrency} />
              ))}
            </div>
            {bitcoinPrice !== null ? (
              <p>Current Bitcoin price: {bitcoinPrice} {selectedCurrency}</p>
            ) : (
              <p>Loading...</p>
            )}
          </div>
        ) : (
          <div>
            <h2>Login</h2>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <button onClick={handleLogin}>Login</button>
          </div>
        )}
      </header>
      <footer className="App-footer">
        Coins
      </footer>
    </div>
  );
}



function CryptoPrice({ crypto, selectedCurrency }) {
  const [price, setPrice] = useState(null);

  useEffect(() => {
    async function fetchCryptoPrice() {
      try {
        const response = await axios.get(`https://api.coindesk.com/v1/bpi/currentprice/${crypto}.json`);
        const data = response.data;
        setPrice(data.bpi[selectedCurrency].rate);
      } catch (error) {
        console.error(`Error fetching ${crypto} price:`, error);
      }
    }

    fetchCryptoPrice();
  }, [crypto, selectedCurrency]);

  return (
    <div className="crypto-item">
      <p>{crypto} price: {price !== null ? `${price} ${selectedCurrency}` : '...'}</p>
    </div>
  );
}

export default App;

