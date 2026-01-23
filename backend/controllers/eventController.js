const pool = require('../config/db')
const Event = require('../models/Event')

exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.findAll()
    res.json(events)
  } catch (err) {
    console.error('GET EVENTS ERROR:', err)
    res.status(500).json({ message: 'Erreur serveur' })
  }
}

exports.getEventById = async (req, res) => {
  try {
    const result = await pool.query(
      `
      SELECT 
        events.id,
        events.title,
        events.description,
        events.date,
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


exports.getAllEvents = async (req, res) => {
  try {
    const events = await pool.query('SELECT * FROM events')
    res.json(events.rows) // le lieu est inclus si présent dans la table
  } catch (err) {
    console.error('GET EVENTS ERROR:', err)
    res.status(500).json({ message: 'Erreur serveur' })
  }
}

exports.getEventById = async (req, res) => {
  try {
    const result = await pool.query(
      `
      SELECT 
        events.id,
        events.title,
        events.description,
        events.date,
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


exports.deleteEvent = async (req, res) => {
  try {
    await Event.delete(req.params.id)
    res.json({ message: 'Événement supprimé' })
  } catch (err) {
    console.error('DELETE EVENT ERROR:', err)
    res.status(500).json({ message: 'Erreur serveur' })
  }
}
