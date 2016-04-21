import express from 'express';
import Subjects from '../models/subjects';
const router = express.Router();

router.route('/subjects')
// create a new user (accessed at POST http://localhost:8080/api/sectors)
    .post(function(req, res) {			
		Subjects.create({
			subject_id:req.body.subject.subject_id, 
			name: req.body.subject.name,
			short_name: req.body.subject.short_name,
			number: req.body.subject.number
			}, function(err,subject){			
				res.status(201);
	            res.json({Message:{ message: 'Update subject had success!', type: 'success',subject: req.body.subject }});
	            res.send();
		})
	})    	
	.get(function(req, res) {
 		Subjects.find(function(err, subject) {
 		if (err)
 			res.send(err);
		res.json(subject);
		// console.log(departments);
 		});
 	})
 	.put(function(req, res) {
		Subjects.update({_id:req.body.subject._id},{$set:
		{
			subject_id:req.body.subject.subject_id, 
			name: req.body.subject.name,
			short_name: req.body.subject.short_name,
			number: req.body.subject.number
		}

		},function(err) {
			if (err) {
                res.send(err);
            }else{
			    res.status(201);
                res.json({Message:{ message: 'Update subject had success!', type: 'success',subject: req.body.subject }});
                res.send();
            }
		
		});
	})
 	.delete(function(req, res) {   
		Subjects.remove({
			_id: req.body.subject
		}, function(err) {
			if (err){
                res.send(err);
            }else{ 
                res.status(201);
                res.json({Message:{ message: 'Delete subject had success!', type: 'success',subject: req.body.subject }});
                res.send();
            }
		});
	})
	
export default router;