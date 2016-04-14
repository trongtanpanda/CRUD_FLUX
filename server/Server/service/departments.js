import express from 'express';
import Departments from '../models/departments';
const router = express.Router();

router.route('/departments')
// create a new user (accessed at POST http://localhost:8080/api/departments)
    .post(function(req, res) {
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
	.delete(function(req, res) {   
		Departments.remove({
			_id: req.body.department
		}, function(err) {
			if (err){
                res.send(err);
            }else{ 
                res.status(201);
                res.json({Message:{ message: 'Delete student had success!', type: 'success',department: req.body.department }});
                res.send();
            }
		});
	})
	
export default router;