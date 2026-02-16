const express = require('express');
const pg = require('pg');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});

app.get('/', (req, res) => {
  res.json({ message: 'Bem-vindo à API Limite 1%!' });
});

app.get('/api/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/users', async (req, res) => {
  const { username, email, password_hash } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING *',
      [username, email, password_hash]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/api/study-plans', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM study_plans');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/study-plans', async (req, res) => {
  const { user_id, plan_name, start_date, end_date } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO study_plans (user_id, plan_name, start_date, end_date) VALUES ($1, $2, $3, $4) RETURNING *',
      [user_id, plan_name, start_date, end_date]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/api/reminders', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM reminders');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/reminders', async (req, res) => {
  const { user_id, reminder_text, reminder_date } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO reminders (user_id, reminder_text, reminder_date) VALUES ($1, $2, $3) RETURNING *',
      [user_id, reminder_text, reminder_date]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});