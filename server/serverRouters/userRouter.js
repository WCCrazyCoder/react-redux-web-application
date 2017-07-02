var superagent = require('superagent');
var Express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser')
var router = Express.Router();
var projectConfig = require('../../project.config.js');

// router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.get('/idcard', (req, res) => {
	var connection = getMySqlConnection();
	connection.connect();
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

router.get('/delete', (req, res) => {
	var connection = getMySqlConnection();
	const sql = `delete from user`;
	connection.query(sql, function(error, results, fileds) {
		if (error) {
			console.log(error);
		}
		res.send({code: '10000', message: 'success'});
	});
	connection.end();
});

/**
 *	根据code获取微信信息
 */
router.get('/wechat', (req, res) => {
	if (req.query.code) {
		new Promise((resolve, reject) => {
			const tokenUrl = `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${projectConfig.appID}&secret=${projectConfig.appSecret}&code=${req.query.code}&grant_type=authorization_code`;
			const request = superagent.get(tokenUrl);
			request.end((err, res) => {
				const body = JSON.parse(res.text);
				if (err || Object.prototype.hasOwnProperty.call(body, 'errcode')) {
					reject(body || err);
				} else {
					resolve(body);
				}
			});
		})
		.then(tokenInfo => {
			console.log(tokenInfo);
			const userinfoUrl = `https://api.weixin.qq.com/sns/userinfo?access_token=${tokenInfo.access_token}&openid=${tokenInfo.openid}&lang=zh_CN`;
			const request = superagent.get(userinfoUrl);
			request.end((err, res) => {
				const body = JSON.parse(res.text);
				if (err || Object.prototype.hasOwnProperty.call(body, 'errcode')) {
					res.json({code: 10009, message: '根据token获取微信信息失败', data: {...body}})
				} else {
					res.json({code: 10000, message: 'success', data: {...body}});
				}
			})
		})
		.catch(e => {
			const wechatInfo = {
				"openid": `o6_bmasdasdsad6_L`,
				"nickname": `维护世界和平`,
				"sex":"1",
				"province":"湖北省",
				"city":"武汉市",
				"country":"燕窝镇",
				"headimgurl":"http://wx.qlogo.cn/mmopen/g3MonUZtNHkdmzicIlibx6iaFqAc56vxLSUfpb6n5WKSYVY0ChQKkiaJSgQ1dZuTOgvLLrhJbERQQ4eMsv84eavHiaiceqxibJxCfHe/46",
				"privilege":[ "PRIVILEGE1","PRIVILEGE2"],
				"unionid": `2sgVt7hMZOPf`
			}
			res.json({code: 10000, message: 'success', data: {...wechatInfo}});
			// res.json({code: 10009, message: '获取微信用户信息失败', data: {...e}});
		})
	} else {
		res.json({code: 10008, message: '缺少参数'});
	}
});

/**
 *	根据字段名查询用户信息
 */
router.get('/userinfo', (req, res) => {
	var connection = getMySqlConnection();
	connection.connect();

	const values = [];
	Object.keys(req.query).forEach(key => values.push(mysql.escape(req.query[key])));
	const sql = `select * from user where ${Object.keys(req.query).join(',')} = ${ values }`;
	connection.query(sql, function (error, results, fields) {
	  	if (error) {
	  		console.log(error);
	  		connection.end();
	  		return res.send({code: 10002, message: '查询数据出错'});
	  	}
	  	if (results.length === 0) {
	  		connection.end();
	  		return res.json({code: 10004, message: '查询的用户不存在'});
	  	}
	  	res.json({code: 10000, message: 'success', data: results[0]});
	  	connection.end();
	});
});

/**
 *	注册用户信息
 */
router.post('/register', (req, res) => {
	var connection = getMySqlConnection();
	connection.connect();
	const querySql = `select * from user where cardno = ${mysql.escape(req.body.cardno)}`;
	connection.query(querySql, function(error, results, fileds) {
		if (error) {
			console.log(error);
			connection.end();
			return res.send({code: 10002, message: '查询数据出错'});
		}
		if (results.length > 0) {
			connection.end();
			return res.json({code: 10000, message: '用户已存在', data: results[0]})
		};
		// 插入用户数据
		const values = [];
		Object.keys(req.body).forEach(key => values.push(mysql.escape(req.body[key])));
		const sql = `insert into user (${ Object.keys(req.body).join(',') }) values (${ values.join(',') })`;
		connection.query(sql, function(error, results, fileds) {
			if (error) {
				console.log(error);
				connection.end();
				return res.send({code: 10003, message: '插入数据出错'});
			}
			res.send({code: 10000, message: 'success', data: Object.assign({id: results.insertId}, req.body)});
		});
		connection.end();
	});
});

router.use('*', (req, res) => {
	res.send({ code: 10010, message: 'failed' });
});

const getMySqlConnection = () => {
	var connection = mysql.createConnection({
	 	host     : '192.168.6.4',
	 	user     : 'root',
	 	password : 'alashan',
	 	database : 'user',
	 	charset  : 'utf8'
	});
	return connection;
}

const createPool = () => {
	var connection = mysql.createPool({
		connectionLimit : 10,
		host     : '192.168.6.4',
		user     : 'root',
		password : 'alashan',
		database : 'user',
		charset  : 'utf8'
	});
	return connection;
}

export default router;
