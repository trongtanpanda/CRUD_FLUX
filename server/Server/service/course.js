import express from 'express';
import Courses from '../models/course';
const router = express.Router();

router.route('/course')
// create a new user (accessed at POST http://localhost:8080/api/Courses)
    .post(function(req, res) {
			
		Courses.create({course_id:req.body.id,name:req.body.name,incoming_year:req.body.year, full: req.body.full}, function(err,course){
			// console.log(user);
			if(err) res.json({message: 'error'});
			res.json({Message:{message: 'Successfully!'}, course: course});
		})
	})    	
	.get(function(req, res) {
 		Courses.find(function(err, Courses) {
 		if (err)
 			res.send(err);
		res.json(Courses);
		// console.log(Courses);
 		});
 	})
 	//--------------updata----------------------//
	.put(function(req, res) {
		Courses.update({_id:req.body._id},{$set:{name:req.body.name}},function(err, user) {
			if (err) res.send(err);
			res.json({me:{message: 'Successfully update'}, user: user });
		});
	})
//-------------------delete---------------------//
router.route('/Courses/:_id')
  // delete the user by the username (accessed at DELETE http://localhost:8080/api/Courses/username/:username)
	.delete(function(req, res) {
		// console.log("asdsds" +req.params._id);
		Courses.remove({
			_id: req.params._id
		}, function(err) {
			if (err) res.send(err);
			res.json({ message: 'Successfully deleted' });
		});
	})
	
export default router;