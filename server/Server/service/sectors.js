import express from 'express';
import Sectors from '../models/sectors';
const router = express.Router();

router.route('/sectors')
// create a new user (accessed at POST http://localhost:8080/api/sectors)
    .post(function(req, res) {		
		Sectors.create({
			sector_id:req.body.sector.sector_id, 
			name: req.body.sector.name,
			short_name: req.body.sector.short_name,
			english_name: req.body.sector.english_name
		}, function(err,sector){
			// console.log(user);
			if(err) {
						res.json({message: 'error'});
			}else{
				res.status(201);
				res.json({Message:{message: 'Successfully!'}, sector: sector});
				res.send();
			}
		})
	})    	
	.get(function(req, res) {
 		Sectors.find(function(err, sector) {
 		if (err)
 			res.send(err);
		res.json(sector);
		// console.log(departments);
 		});
 	})
		.put(function(req, res) {
		Sectors.update({_id:req.body.sector._id},{$set:
		{
			sector_id:req.body.sector.sector_id, 
			name: req.body.sector.name,
			short_name: req.body.sector.short_name,
			english_name: req.body.sector.english_name
		}

		},function(err) {
			if (err) {
                res.send(err);
            }else{
			    res.status(201);
                res.json({Message:{ message: 'Update sector had success!', type: 'success',sector: req.body.sector }});
                res.send();
            }
		
		});
	})
 	.delete(function(req, res) {   
		Sectors.remove({
			_id: req.body.sector
		}, function(err) {
			if (err){
                res.send(err);
            }else{ 
                res.status(201);
                res.json({Message:{ message: 'Delete sector had success!', type: 'success',sector: req.body.sector }});
                res.send();
            }
		});
	})

	
export default router;