var express = require('express');
var router = express.Router();
var db = require('../DBfunctions/sqlDB.js');




router.post('/getItems', function(req, res, next) {

	db.getItems(function (err, result) {
		if (err) {
			console.log(err);
			return res.json({ "status": "failed", "message": "DB Error!", "code": 500 });
		}

		return res.json({ "status": "success", "message": "Items Received!", "code": 200, "items": result });
	});
});


router.post('/getCategoryItems', function(req, res, next) {

	var status = req.body.status;

	if(status != "Done" && status != "Pending" && status != "Deleted")
		return res.json({ "status": "failed", "message": "Wrong Status/Category!", "code": 404 });

	db.getCategoryItems(status, function (err, result) {
		if (err) {
			console.log(err);
			return res.json({ "status": "failed", "message": "DB Error!", "code": 500 });
		}

		return res.json({ "status": "success", "message": "Items Received!", "code": 200, "items": result });
	});
});


router.post('/changeStatus', function(req, res, next) {

	var id = req.body.id;
	var status = req.body.status;

	if(!id || !status)
		return res.json({ "status": "failed", "message": "Invalid Data!", "code": 500 });

	db.changeStatus(id, status, function (err, result) {
		if (err) {
			console.log(err);
			return res.json({ "status": "failed", "message": "DB Error!", "code": 500 });
		}

		return res.json({ "status": "success", "message": "Items Received!", "code": 200 });
	});
});


router.post('/addElementBackend', function(req, res, next) {

	var description = req.body.description;
	var status = req.body.status;

	if(!description || !status)
		return res.json({ "status": "failed", "message": "Invalid Data!", "code": 500 });

	db.addElement(description, status, function (err, result) {
		if (err) {
			console.log(err);
			return res.json({ "status": "failed", "message": "DB Error!", "code": 500 });
		}

		return res.json({ "status": "success", "message": "Items Received!", "code": 200 });
	});
});


router.post('/editItem', function(req, res, next) {

	var id = req.body.id;
	var description = req.body.description;

	if(!description || !id)
		return res.json({ "status": "failed", "message": "Invalid Data!", "code": 500 });

	db.editItem(id, description, function (err, result) {
		if (err) {
			console.log(err);
			return res.json({ "status": "failed", "message": "DB Error!", "code": 500 });
		}

		return res.json({ "status": "success", "message": "Items Received!", "code": 200 });
	});
});


module.exports = router;
