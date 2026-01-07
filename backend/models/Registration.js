const pool = require('../config/db')

async function initRegistrationTable() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS registrations (
      id SERIAL PRIMARY KEY,
      user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
      event_id INTEGER REFERENCES events(id) ON DELETE CASCADE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      UNIQUE (user_id, event_id)
    )
  `)
}

initRegistrationTable()

module.exports = {}
