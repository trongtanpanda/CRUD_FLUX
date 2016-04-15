import express from 'express';
import Students from '../models/students';
const router = express.Router();

router.route('/students')
// create a new user (accessed at POST http://localhost:8080/api/sectors)
    .post(function(req, res) {
		Students.create({
			student_id:req.body.student.student_id, 
			firstname: req.body.student.firstname,
			lastname: req.body.student.lastname,
			midname: req.body.student.midname

			}, function(err,student){
			// console.log(user);
				if(err) {
						res.json({message: 'error'});
				}else{
					res.status(201);
					res.json({Message:{message: 'Successfully!'}, student: student});
					res.send();
				}
			});
		})    	
		.get(function(req, res) {
	 		Students.find(function(err, student) {
	 		if (err)
	 			res.send(err);
			res.json(student);
			// console.log(departments);
	 		});
	 	})
	 	.put(function(req, res) {
			Students.update({_id:req.body.student._id},{$set:
			{
				student_id:req.body.student.student_id, 
				firstname: req.body.student.firstname,
				lastname: req.body.student.lastname,
				midname: req.body.student.midname
			}

			},function(err) {
				if (err) {
	                res.send(err);
	            }else{
				    res.status(201);
	                res.json({Message:{ message: 'Update student had success!', type: 'success',student: req.body.student }});
	                res.send();
	            }
			
			});
		})
	 	.delete(function(req, res) {   
			Students.remove({
				_id: req.body.student
			}, function(err) {
				if (err){
	                res.send(err);
	            }else{ 
	                res.status(201);
	                res.json({Message:{ message: 'Delete student had success!', type: 'success',student: req.body.student }});
	                res.send();
	            }
			});
		})

	
export default router;