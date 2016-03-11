import express from 'express';
import Term_class from '../models/term_class';
const router = express.Router();

router.route('/term_class')
// create a new user (accessed at POST http://localhost:8080/api/sectors)
    .post(function(req, res) {
			
		Term_class.create({	
						term_class_id: req.body.id, 
						name: req.body.name, 
						number: req.body.number, 
						theory: req.body.theory, 
						perceive : req.body.perceive, 
						self_taught : req.body.self_taught, 
						test_student :req.body.test_student, 
						practive: req.body.practive, 
						diligence: req.body.diligence, 
						last_test: req.body.last_test, 
					}, function(err,term_class){
			// console.log(user);
			if(err) res.json({message: 'error'});
			res.json({Message:{message: 'Successfully!'}, term_class: term_class});
		})
	})    	
	.get(function(req, res) {
 		Term_class.find(function(err, term_class) {
 		if (err)
 			res.send(err);
		res.json(term_class);
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