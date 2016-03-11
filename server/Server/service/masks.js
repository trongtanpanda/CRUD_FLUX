import express from 'express';
import Masks from '../models/masks';
const router = express.Router();

router.route('/masks')
// create a new user (accessed at POST http://localhost:8080/api/sectors)
    .post(function(req, res) {
			
		Masks.create({	student:req.body.student, 
						term_class: req.body.term_class,
						cc: req.body.cc, 						
						gk: req.body.gk,
						tbkt: req.body.tbkt,
						t1: req.body.t1,
						tkml1: req.body.tkml1,
						t2: req.body.t2,
						tkml2: req.body.tkml2,
						t3: req.body.t3,
						by_text: req.body.by_text,
						by_number: req.body.by_number,
					}, function(err,masks){
			// console.log(user);
			if(err) res.json({message: 'error'});
			res.json({Message:{message: 'Successfully!'}, masks: masks});
		})
	})    	
	.get(function(req, res) {
 		Masks.find(function(err, masks) {
 		if (err)
 			res.send(err);
		res.json(masks);
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