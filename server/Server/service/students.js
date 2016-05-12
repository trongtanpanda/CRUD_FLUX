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
			native: req.body.student.native,
			gender: req.body.student.gender,
			birthday: req.body.student.birthday


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
	 		});
	 	})
	 	.put(function(req, res) {
			Students.update({_id:req.body.student._id},{$set:
			{
				student_id:req.body.student.student_id, 
				firstname: req.body.student.firstname,			
				lastname: req.body.student.lastname,
				native: req.body.student.native,
				gender: req.body.student.gender,
				birthday: req.body.student.birthday
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
	router.route('/students/excel')
		.post(function(req, res) {
			var data = req.body.list;
			var result=[];
			for(var i=0; i<data.length; i++){
				Students.create({
					student_id:data[i]["Mã sv"], 
					firstname: data[i]["Họ "],		
					lastname: data[i]["Tên"],
					native: data[i]["Quê Quán"],
					gender: data[i]["Giới tính"],
				 	birthday: data[i]["Lớp SH"]

				}, function(err,student){
					if(err) console.log(err);
					result.push(student);
					console.log(student);					
				});
			}
			res.status(201);
            res.json({Message:{ message: 'Delete student had success!', type: 'success',student:  result}});
            res.send();
		})

	router.route('/students/find')
		.put(function(req, res) {
			var text = req.body.text;
			var clss= req.body.clss;
			console.log(text);
			Students.find({ 'lastname' :new RegExp('^'+text+'$', "i") }, function(err, doc){
				if(err) console.log(err);
				console.log(doc);
			});
			
		})

	
export default router;