const express = require('express');
const fetch = require('node-fetch');
const app = express();
const PORT = process.env.PORT || 3000;

// Permitir CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});

app.use(express.json());

app.post('/reporte', async (req, res) => {
  try {
    // CAMBIA esta URL por la de tu Apps Script:
    const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyD97Hj3zMLvAGMhkNYMsM61lu_5S1H_npmpa2W1Un4a-AgUqiXjHbp6KR01n63875f/exec';

    const respuesta = await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      body: JSON.stringify(req.body),
      headers: { 'Content-Type': 'application/json' }
    });
    const data = await respuesta.json();
    res.json(data);
  } catch (err) {
    res.json({ ok: false, error: err.message });
  }
});

app.listen(PORT, () => {
  console.log('Servidor corriendo en puerto', PORT);
});
