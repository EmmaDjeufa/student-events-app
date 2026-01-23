const pool = require('../config/db')
const Event = require('../models/Event')

// Tous les événements (avec location et email admin)

exports.getAllEvents = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        events.id,
        events.title,
        events.description,
        events.date,
        events.time,
        events.location,
        users.email AS admin_email
      FROM events
      JOIN users ON events.created_by = users.id
    `)
    res.json(result.rows)
  } catch (err) {
    console.error('GET EVENTS ERROR:', err)
    res.status(500).json({ message: 'Erreur serveur' })
  }
}

// Détail d'un événement
exports.getEventById = async (req, res) => {
  try {
    const result = await pool.query(
      `
      SELECT 
        events.id,
        events.title,
        events.description,
        events.date,
        events.time,
        events.location,
        users.email AS admin_email
      FROM events
      JOIN users ON events.created_by = users.id
      WHERE events.id = $1
      `,
      [req.params.id]
    )

    if (!result.rows.length) {
      return res.status(404).json({ message: 'Événement introuvable' })
    }

    res.json(result.rows[0])
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Erreur serveur' })
  }
}

exports.createEvent = async (req, res) => {
  const { title, description, date, time, location } = req.body
  try {
    const result = await pool.query(
      `
      INSERT INTO events (title, description, date,time, location, created_by)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
      `,
      [title, description, date, time, location, req.user.id]
    )
    res.status(201).json(result.rows[0])
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Erreur lors de la création de l’événement' })
  }
}

exports.updateEvent = async (req, res) => {
  const { title, description, date,time, location } = req.body
  try {
    const result = await pool.query(
      `
      UPDATE events
      SET title = $1,
          description = $2,
          date = $3,
          time = $4,
          location = $4
      WHERE id = $5
      RETURNING *
      `,
      [title, description, date,time,location, req.params.id]
    )

    if (!result.rows.length) {
      return res.status(404).json({ message: 'Événement introuvable' })
    }

    res.json(result.rows[0])
  } catch (err) {
    console.error('UPDATE EVENT ERROR:', err)
    res.status(500).json({ message: 'Erreur serveur' })
  }
}

// Supprimer un événement
exports.deleteEvent = async (req, res) => {
  try {
    await Event.delete(req.params.id)
    res.json({ message: 'Événement supprimé' })
  } catch (err) {
    console.error('DELETE EVENT ERROR:', err)
    res.status(500).json({ message: 'Erreur serveur' })
  }
}
