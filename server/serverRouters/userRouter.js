var Express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser')
var router = Express.Router();

// router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.get('/idcard', (req, res) => {
	var connection = getMySqlConnection();
	connection.connect();
	// const sql = `select * from user where `
	connection.query('select * from user', function (error, results, fields) {
	  	if (error) return res.send(error);
	  	res.json({
		  "resp": {
		    "code": 0,
		    "desc": "匹配"
		  },
		  "data": {
		    "sex": "M",
		    "address": "广东省清远市清新县",
		    "birthday": "1989-05-25"
		  }
		});
	});
	connection.end();
})

router.get('/', (req, res) => {
	var connection = getMySqlConnection();
	connection.connect();
	const values = [];
	Object.keys(req.query).forEach(key => values.push(mysql.escape(req.query[key])));
	const sql = `select * from user where ${Object.keys(req.query).join(',')} = ${ values }`;
	console.log(sql);
	connection.query(sql, function (error, results, fields) {
	  	if (error) {
	  		console.log(error);
	  		return res.send({code: 10002, message: '查询数据出错'});
	  	}
	  	if (results.length === 0) {
	  		return res.json({code: 10004, message: '查询的用户不存在'});
	  	}
	  	res.json(results[0]);
	});
	connection.end();
});

router.post('/', (req, res) => {
	var connection = getMySqlConnection();
	connection.connect();
	const querySql = `select * from user where cardno = ${mysql.escape(req.body.cardno)}`;
	connection.query(querySql, function(error, results, fileds) {
		if (error) {
			console.log(error);
			return res.send({code: 10002, message: '查询数据出错'});
		}
		if (results.length > 0) {
			console.log(111);
			return res.json({code: 10000, message: '用户已存在', data: results[0]})
		};

		// 插入用户数据
		const values = [];
		Object.keys(req.body).forEach(key => values.push(mysql.escape(req.body[key])));
		const sql = `insert into user (${ Object.keys(req.body).join(',') }) values (${ values.join(',') })`;
		connection.query(sql, function(error, results, fileds) {
			if (error) {
				console.log(error);
				return res.send({code: 10003, message: '插入数据出错'});
			}
		});


		connection.end();
	});
	console.log(222);
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

const createPool = () => {
	var connection = mysql.createPool({
		connectionLimit : 10,
		host     : 'localhost',
		user     : 'root',
		password : 'wangchao',
		database : 'user',
		charset  : 'utf8'
	});
	return connection;
}

function getUserInfo(connection, cardno, callback) {
	const querySql = `select * from user where cardno = ${ mysql.escape(cardno) }`;
	connection.query(querySql, function(error, results, fileds) {
		if (error) {
			console.log(error);
			return res.send({code: 10002, message: '查询数据出错'});				
		}
		if (results.length > 0) {
			res.json({code: 10000, message: '成功', data: results[0]});
		}
		res.json({code: 10004, message: '查询的用户不存在'});
	});	
}

export default router;
