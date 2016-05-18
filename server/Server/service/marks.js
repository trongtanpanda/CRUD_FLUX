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

router.route('/marks/getbyterm')
	.get(function(req, res){
		Marks.find({termClass : '56dffa0c8c87a1140e83b9d0'}, function(err, marks){
			if (err){
                res.send(err);
            }else{ 
                res.status(201);
                res.json({Message:{ message: 'Delete mark had success!', type: 'success',marks: marks }});
                res.send();
            }
		});
	});

router.route('/marks/addstudent')
	.post(function(req, res){
	var invalid =[]; 
	var valid =[];
	console.log(req.body.student.length);
	for(var i=0; i<req.body.student.length; i++){
		Marks.find({termCLass: req.body.termCLass},{student: req.body.student[i]}, function(err,mark){
			if(mark){
				console.log("ci");
				valid.push(req.body.student[i]);
			}else{
				invalid.push(req.body.student[i]);
			} 
			
		});		
	}	
		
	});
	
export default router;