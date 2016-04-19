import express from 'express';
import Courses from '../models/course';
const router = express.Router();

router.route('/course')
// create a new user (accessed at POST http://localhost:8080/api/Courses)
    .post(function(req, res) {
			console.log(req.body.course);
		Courses.create({
			course_id:req.body.course.course_id,
			name:req.body.course.name,
			incoming_year:req.body.course.incoming_year,
			full: req.body.course.full
		}, function(err,course){
			if(err){
				console.log(err);
			}else{
				res.status(201);
				res.json({Message:{message: 'Successfully!'}, course: course});
				res.send();
			}
			
		});
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
		console.log(req.body);
			Courses.update({_id:req.body.course._id},{$set:
			{
				course_id:req.body.course.course_id,
				name:req.body.course.name,
				incoming_year:req.body.course.incoming_year,
				full: req.body.course.full
			}

			},function(err) {
				if (err) {
	                res.send(err);
	            }else{
				    res.status(201);
	                res.json({Message:{ message: 'Update student had success!', type: 'success',course: req.body.course }});
	                res.send();
	            }
			
			});
		})
	 	.delete(function(req, res) {   
			Courses.remove({
				_id: req.body.course
			}, function(err) {
				if (err){
	                res.send(err);
	            }else{ 
	                res.status(201);
	                res.json({Message:{ message: 'Delete student had success!', type: 'success',course: req.body.course }});
	                res.send();
	            }
			});
		})
	
export default router;