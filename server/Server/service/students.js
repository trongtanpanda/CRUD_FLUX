import express from 'express';
import Students from '../models/students';
const router = express.Router();

router.route('/students')
// create a new user (accessed at POST http://localhost:8080/api/sectors)
    .post(function(req, res) {
			
		Students.create({student_id:req.body.id, 
			firstname: req.body.firstname,
			lastname: req.body.lastname,
			midname: req.body.midname

			}, function(err,student){
			// console.log(user);
			if(err) res.json({message: 'error'});
			res.json({Message:{message: 'Successfully!'}, student: student});
		})
	})    	
	.get(function(req, res) {
 		Students.find(function(err, student) {
 		if (err)
 			res.send(err);
		res.json(student);
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