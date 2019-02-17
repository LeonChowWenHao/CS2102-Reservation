var express = require('express');
var router = express.Router();

const { Pool } = require('pg')

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: '********',
  port: 5432,
})

/* const pool = new Pool({
	connectionString: process.env.DATABASE_URL
}); */


/* SQL Query */
var sql_query = 'SELECT * FROM branches';

router.get('/', function(req, res, next) {
	pool.query(sql_query, (err, data) => {
		res.render('manageBranch', { title: 'Restaurant Branches', data: data.rows });
	});
});

module.exports = router;
