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
    const event = await Event.findById(req.params.id)
    if (!event) {
      return res.status(404).json({ message: 'Événement introuvable' })
    }
    res.json(event)
  } catch (err) {
    console.error('GET EVENT ERROR:', err)
    res.status(500).json({ message: 'Erreur serveur' })
  }
}

exports.createEvent = async (req, res) => {
  try {
    const { title, description, date } = req.body

    if (!title || !description || !date) {
      return res.status(400).json({ message: 'Champs manquants' })
    }

    const event = await Event.create({ title, description, date })
    res.status(201).json(event)
  } catch (err) {
    console.error('CREATE EVENT ERROR:', err)
    res.status(500).json({ message: 'Erreur serveur' })
  }
}

exports.updateEvent = async (req, res) => {
  try {
    const { title, description, date } = req.body
    const event = await Event.update(req.params.id, { title, description, date })
    res.json(event)
  } catch (err) {
    console.error('UPDATE EVENT ERROR:', err)
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
