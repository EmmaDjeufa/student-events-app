const { Pool } = require('pg')
require('dotenv').config()

// Sur Render, DATABASE_URL est fourni
const connectionString = process.env.DATABASE_URL || `postgres://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`

const pool = new Pool({
  connectionString,
  ssl: { rejectUnauthorized: false } // obligatoire sur Render
})

pool.on('connect', () => console.log('✅ Connected to PostgreSQL'))

module.exports = pool
