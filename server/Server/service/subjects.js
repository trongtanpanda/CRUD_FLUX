import express from 'express';
import Subjects from '../models/subjects';
const router = express.Router();

router.route('/subjects')
// create a new user (accessed at POST http://localhost:8080/api/sectors)
    .post(function(req, res) {
			
		Subjects.create({subject_id:req.body.id, name: req.body.name, short_name: req.body.short_name, number: req.body.english_name}, function(err,sector){
			// console.log(user);
			if(err) res.json({message: 'error'});
			res.json({Message:{message: 'Successfully!'}, sector: sector});
		})
	})    	
	.get(function(req, res) {
 		Subjects.find(function(err, sector) {
 		if (err)
 			res.send(err);
		res.json(sector);
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