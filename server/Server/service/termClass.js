import express from 'express';
import TermClass from '../models/termClass';
const router = express.Router();

router.route('/termClass')
// create a new user (accessed at POST http://localhost:8080/api/sectors)
    .post(function(req, res) {
		TermClass.create({	
			termClass_id:req.body.termClass.termClass_id, 
			name: req.body.termClass.name,
			number: req.body.termClass.number,
			theory: req.body.termClass.theory,
			perceive : req.body.termClass.perceive, 
			self_taught : req.body.termClass.self_taught, 
			test_student :req.body.termClass.test_student, 
			practive: req.body.termClass.practive, 
			diligence: req.body.termClass.diligence, 
			last_test: req.body.termClass.last_test 
		}, function(err,termClass){
			res.status(201);
            res.json({Message:{ message: 'Update TermClass had success!', type: 'success',termClass: termClass }});
            res.send();
		})
	})    	
	.get(function(req, res) {
	 		TermClass.find(function(err, termClass) {
	 		if (err)
	 			res.send(err);
				res.json(termClass);			
	 		});
	 	})
 	.put(function(req, res) {
		TermClass.update({_id:req.body.termClass._id},{$set:
		{
			termClass_id:req.body.termClass.termClass_id, 
			name: req.body.termClass.name,
			number: req.body.termClass.number,
			theory: req.body.termClass.theory,
			perceive : req.body.termClass.perceive, 
			self_taught : req.body.termClass.self_taught, 
			test_student :req.body.termClass.test_student, 
			practive: req.body.termClass.practive, 
			diligence: req.body.termClass.diligence, 
			last_test: req.body.termClass.last_test 
		}

		},function(err) {
			if (err) {
                res.send(err);
            }else{
			    res.status(201);
                res.json({Message:{ message: 'Update TermClass had success!', type: 'success',termClass: req.body.termClass }});
                res.send();
            }
		
		});
	})
 	.delete(function(req, res) {   
		TermClass.remove({
			_id: req.body.termClass
		}, function(err) {
			if (err){
                res.send(err);
            }else{ 
                res.status(201);
                res.json({Message:{ message: 'Delete TermClass had success!', type: 'success',termClass: req.body.termClass }});
                res.send();
            }
		});
	})
	router.route('/termClass/getbyname')
    .put(function(req, res) {
    	var clss= req.body.text;
			var re = new RegExp('^'+clss+'$', "i")
			TermClass.findOne({'termClass_id': {'$regex': re}}).exec(function(err, termClass) {			
 		if (err){
                res.send(err);
            }else{ 
                res.status(201);
                res.json({Message:{ message: 'Delete TermClass had success!', type: 'success',termClass: termClass }});
                res.send();
            }		
 		});
	})    	
	
export default router;