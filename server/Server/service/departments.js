import express from 'express';
import Departments from '../models/departments';
const router = express.Router();

router.route('/departments')
// create a new user (accessed at POST http://localhost:8080/api/departments)
    .post(function(req, res) {
			console.log(req.body);
		Departments.create({			
			department_id:req.body.department.id,
			name: req.body.department.name, 
			dean: req.body.department.dean, 
			ministry: req.body.department.ministry, 
			phone: req.body.department.phone
		}, function(err,department){
			// console.log(user);
			if(err) res.json({message: 'error'});
			res.json({Message:{message: 'Successfully!'}, department: department});
		})
	})    	
	.get(function(req, res) {
 		Departments.find(function(err, departments) {
 		if (err)
 			res.send(err);
		res.json(departments);
		// console.log(departments);
 		});
 	})
 	//--------------updata----------------------//
	// .put(function(req, res) {
	// 	Courses.update({_id:req.body._id},{$set:{name:req.body.name}},function(err, user) {
	// 		if (err) res.send(err);
	// 		res.json({me:{message: 'Successfully update'}, user: user });
	// 	});
	// })
//-------------------delete---------------------//
router.route('/Courses/:_id')
  // delete the user by the username (accessed at DELETE http://localhost:8080/api/Courses/username/:username)
	// .delete(function(req, res) {
	// 	// console.log("asdsds" +req.params._id);
	// 	Courses.remove({
	// 		_id: req.params._id
	// 	}, function(err) {
	// 		if (err) res.send(err);
	// 		res.json({ message: 'Successfully deleted' });
	// 	});
	// })
	
export default router;