var express = require('express');
var router = express.Router();
const url = require('url');    



const { Pool } = require('pg')

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

/* SQL Query */
var sql_query_Insert = 'INSERT INTO customer_info VALUES';
var sql_query_login = 'SELECT * FROM customer_info';

var sql_query = 'SELECT * FROM customer_info';


// GET
router.get('/', function (req, res, next) {
    res.render('login', { title: 'Login User', error: false });
});


// POST
router.post('/', function (req, res, next) {

    // Retrieve Information
    var email = req.body.email;
    var password = req.body.password;

    // Construct Specific SQL Query
    // var retrieve_query = "select name from customer_info where email = 'test@email.com'";
    var retrieve_query = "select * from customer_info where email = '" + email + "'" 
                + "AND password='" + password + "'"  ;

   
    pool.query(retrieve_query, (err, data) => {

        if(data.rows.length == 0) {
            res.render('login', { title: 'Login User', error: true });
      
        } else {
            var user = {
                name: data.rows[0].name,
                email: data.rows[0].email,
                isLogIn: true
            }
            
            req.app.locals.user = user;

            res.redirect("/");

            // res.redirect(url.format({
            //     pathname: "/",
            //     query: {
            //         user: user,
            //     },
            // }));
        }
    });

});

module.exports = router;
