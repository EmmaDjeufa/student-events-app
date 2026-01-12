const express = require('express')
const pool = require('../config/db')
const auth = require('../middleware/auth')

const router = express.Router()

// ✅ Liste publique des événements
router.get('/', async (req, res, next) => {
  try {
    const result = await pool.query('SELECT * FROM events ORDER BY date DESC')
    res.json(result.rows)
  } catch (err) {
    next(err)
  }
})

// 🔒 Ajouter un événement (uniquement inscrit)
router.post('/', auth, async (req, res, next) => {
  try {
    const { title, description, date } = req.body
    const result = await pool.query(
      'INSERT INTO events (title, description, date, created_by) VALUES ($1,$2,$3,$4) RETURNING *',
      [title, description, date, req.userId]
    )
    res.status(201).json(result.rows[0])
  } catch (err) {
    next(err)
  }
})

// 🔒 Modifier un événement
router.put('/:id', auth, async (req, res, next) => {
  try {
    const { id } = req.params
    const { title, description, date } = req.body
    const result = await pool.query(
      'UPDATE events SET title=$1, description=$2, date=$3 WHERE id=$4 RETURNING *',
      [title, description, date, id]
    )
    res.json(result.rows[0])
  } catch (err) {
    next(err)
  }
})

// 🔒 Supprimer un événement
router.delete('/:id', auth, async (req, res, next) => {
  try {
    const { id } = req.params
    await pool.query('DELETE FROM events WHERE id=$1', [id])
    res.json({ message: 'Événement supprimé' })
  } catch (err) {
    next(err)
  }
})

module.exports = router
