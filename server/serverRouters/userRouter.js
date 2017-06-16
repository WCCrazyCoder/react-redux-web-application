var Express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser')
var router = Express.Router();

// router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.get('/', (req, res) => {
	var connection = getMySqlConnection();
	connection.connect();
	connection.query('select * from user', function (error, results, fields) {
	  if (error) return res.send(error);
	  res.json(results);
	});
	connection.end();
});

router.post('/', (req, res) => {
	var connection = getMySqlConnection();
	connection.connect();
	console.log(`insert into user (username) values('${req.body.username}')`);
	connection.query(`insert into user (username) values('${req.body.username}')`, function(error, results, fileds) {
		if (error) return res.send(error);
		res.json(results);
	});
	connection.end();
});

const getMySqlConnection = () => {
	var connection = mysql.createConnection({
	  host     : 'localhost',
	  user     : 'root',
	  password : 'wangchao',
	  database : 'user',
	  charset  : 'utf8'
	});
	return connection;
}

export default router;
