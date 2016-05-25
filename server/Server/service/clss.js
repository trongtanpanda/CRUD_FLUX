import express from 'express';
import Clss from '../models/clss';
const router = express.Router();

router.route('/clss')
// create a new user (accessed at POST http://localhost:8080/api/sectors)
    .post(function(req, res) {		
    	console.log(req.body);
		Clss.create({
			name: req.body.clss.name,
			short_name: req.body.clss.short_name,			
		}, function(err,clss){
			// console.log(user);
			if(err) {
						res.json({message: 'error'});
			}else{
				res.status(201);
				res.json({Message:{message: 'Successfully!'}, clss: clss});
				res.send();
			}
		})
	})    	
	.get(function(req, res) {
 		Clss.find(function(err, clss) {
 		if (err)
 			res.send(err);
		res.json(clss);
		// console.log(departments);
 		});
 	})
		.put(function(req, res) {
		Clss.update({_id:req.body.clss._id},{$set:
		{			
			name: req.body.clss.name,
			short_name: req.body.clss.short_name,			
		}

		},function(err) {
			if (err) {
                res.send(err);
            }else{
			    res.status(201);
                res.json({Message:{ message: 'Update clss had success!', type: 'success',clss: req.body.clss }});
                res.send();
            }
		
		});
	})
 	.delete(function(req, res) {   
		Clss.remove({
			_id: req.body.clss
		}, function(err) {
			if (err){
                res.send(err);
            }else{ 
                res.status(201);
                res.json({Message:{ message: 'Delete clss had success!', type: 'success',clss: req.body.clss }});
                res.send();
            }
		});
	})

	
export default router;