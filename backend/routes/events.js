const express = require('express')
const pool = require('../config/db')

const router = express.Router()

// ================================
// GET /api/events
// Liste des événements
// ================================
router.get('/', async (req, res, next) => {
  try {
    const result = await pool.query(
      'SELECT * FROM events ORDER BY date DESC'
    )
    res.json(result.rows)
  } catch (err) {
    next(err)
  }
})

// ================================
// POST /api/events
// Créer un événement
// ================================
router.post('/', async (req, res, next) => {
  const { title, description, date } = req.body

  if (!title || !description || !date) {
    return res.status(400).json({ message: 'Champs manquants' })
  }

  try {
    const result = await pool.query(
      `INSERT INTO events (title, description, date)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [title, description, date]
    )

    res.status(201).json(result.rows[0])
  } catch (err) {
    next(err)
  }
})

// ================================
// PUT /api/events/:id
// Modifier un événement
// ================================
router.put('/:id', async (req, res, next) => {
  const { id } = req.params
  const { title, description, date } = req.body

  try {
    const result = await pool.query(
      `UPDATE events
       SET title = $1,
           description = $2,
           date = $3
       WHERE id = $4
       RETURNING *`,
      [title, description, date, id]
    )

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Événement introuvable' })
    }

    res.json(result.rows[0])
  } catch (err) {
    next(err)
  }
})

// ================================
// DELETE /api/events/:id
// Supprimer un événement
// ================================
router.delete('/:id', async (req, res, next) => {
  const { id } = req.params

  try {
    const result = await pool.query(
      'DELETE FROM events WHERE id = $1',
      [id]
    )

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Événement introuvable' })
    }

    res.status(204).send()
  } catch (err) {
    next(err)
  }
})

module.exports = router
