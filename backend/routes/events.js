const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const admin = require('../middleware/admin')
const controller = require('../controllers/eventController')

router.get('/', controller.getAllEvents)
router.get('/:id', controller.getEventById)

router.post('/', auth, admin, controller.createEvent)
router.put('/:id', auth, admin, controller.updateEvent)
router.delete('/:id', auth, admin, controller.deleteEvent)

module.exports = router
