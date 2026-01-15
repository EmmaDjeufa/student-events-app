const pool = require('../config/db')

exports.getAllUsersWithEvents = async (req, res) => {
  try {
    const usersRes = await pool.query(`
      SELECT u.id, u.name AS user_name, u.email AS user_email, u.role AS user_role,
      COALESCE(
        ARRAY(
          SELECT e.title
          FROM registrations r
          JOIN events e ON r.event_id = e.id
          WHERE r.user_id = u.id
        ), '{}'
      ) AS events
      FROM users u
      ORDER BY u.role DESC, u.name ASC
    `)

    res.json(usersRes.rows)
  } catch (err) {
    console.error('GET USERS ERROR:', err)
    res.status(500).json({ message: 'Erreur serveur' })
  }
}
