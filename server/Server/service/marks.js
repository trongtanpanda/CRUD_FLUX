import express from 'express';
import Marks from '../models/marks';
const router = express.Router();

router.route('/marks')
// create a new user (accessed at POST http://localhost:8080/api/sectors)
     .post(function(req, res) {
		Marks.create({	
			student:req.body.mark.student, 
			termClass: req.body.mark.termClass,
			number: req.body.mark.number,
			cc: req.body.mark.cc,
			gk : req.body.mark.gk, 
			tbkt : req.body.mark.tbkt, 
			t1 :req.body.mark.t1, 
			tkml1: req.body.mark.tkml1, 
			t2: req.body.mark.t2, 
			tkml2: req.body.mark.tkml2,
			t3: req.body.mark.t3,
			by_text: req.body.mark.by_text,
			by_number: req.body.mark.by_number 
		}, function(err,mark){
			res.status(201);
            res.json({Message:{ message: 'Update mark had success!', type: 'success',mark: mark }});
            res.send();
		})
	})    	
	.get(function(req, res) {
	 		Marks.find(function(err, mark) {
	 		if (err)
	 			res.send(err);
				res.json(mark);			
	 		});
	 	})
 	.put(function(req, res) {
 		console.log(req.body);
		Marks.update({_id:req.body.mark._id},{$set:
		{
			student:req.body.mark.student, 
			termClass: req.body.mark.termClass,
			number: req.body.mark.number,
			cc: req.body.mark.cc,
			gk : req.body.mark.gk, 
			tbkt : req.body.mark.tbkt, 
			t1 :req.body.mark.t1, 
			tkml1: req.body.mark.tkml1, 
			t2: req.body.mark.t2, 
			tkml2: req.body.mark.tkml2,
			t3: req.body.mark.t3,
			by_text: req.body.mark.by_text,
			by_number: req.body.mark.by_number 
		}

		},function(err) {
			if (err) {
                res.send(err);
            }else{
			    res.status(201);
                res.json({Message:{ message: 'Update mark had success!', type: 'success',mark: req.body.mark }});
                res.send();
            }
		
		});
	})
 	.delete(function(req, res) {   
		Marks.remove({
			_id: req.body.mark
		}, function(err) {
			if (err){
                res.send(err);
            }else{ 
                res.status(201);
                res.json({Message:{ message: 'Delete mark had success!', type: 'success',mark: req.body.mark }});
                res.send();
            }
		});
	})
	
export default router;