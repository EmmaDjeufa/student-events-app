const pool = require('../config/db')

exports.findAll = async () => {
  const { rows } = await pool.query(
    'SELECT * FROM events ORDER BY date ASC'
  )
  return rows
}

exports.findById = async (id) => {
  const { rows } = await pool.query(
    'SELECT * FROM events WHERE id = $1',
    [id]
  )
  return rows[0]
}

exports.create = async ({ title, description, date }) => {
  const { rows } = await pool.query(
    'INSERT INTO events (title, description, date) VALUES ($1, $2, $3) RETURNING *',
    [title, description, date]
  )
  return rows[0]
}

exports.update = async (id, { title, description, date }) => {
  const { rows } = await pool.query(
    'UPDATE events SET title=$1, description=$2, date=$3 WHERE id=$4 RETURNING *',
    [title, description, date, id]
  )
  return rows[0]
}

exports.delete = async (id) => {
  await pool.query('DELETE FROM events WHERE id = $1', [id])
}
