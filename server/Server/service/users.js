import express from 'express';
import Users from '../models/users';
import Courses from '../models/course';
const router = express.Router();

router.route('/users')
//----------- create a new user--------------// 
    .post(function(req, res) {	   
		Users.create({
			name:req.body.student.name,
			course: req.body.student.course
		}, function(err,user){            
			if(err) {                
				res.json({Message:{message: 'Add new had error!', type: 'error'}});
			}else{
                res.status(201);
                res.json({Message:{ message: 'Create new student had success!', type: 'success',user: user }});
                res.send();
			}
		})
	}) 
//----------- get all user------------------//	   	
	.get(function(req, res) {
 		Users.find(function(err, users) {
 		if (err)
 			res.send(err);
		res.json(users);
		// console.log(users);
 		});
 	})
//--------------updata----------------------//
	.put(function(req, res) {
		Users.update({_id:req.body.student._id},{$set:{name:req.body.student.name, course: req.body.student.course}},function(err, user) {
			if (err) {
                res.send(err);
            }else{
			    res.status(201);
                res.json({Message:{ message: 'Update student had success!', type: 'success',user: user }});
                res.send();
                console.log(user);
            }
			
		});
	})
//--------------delete----------------------//
// delete the user by _id
router.route('/users/delete')
	.delete(function(req, res) {   
		Users.remove({
			_id: req.body.studentId
		}, function(err) {
			if (err){
                res.send(err);
            }else{ 
                res.status(201);
                res.json({Message:{ message: 'Delete student had success!', type: 'success',studentId: req.body.studentId }});
                res.send();
            }
		});
	})
	
export default router;