import express from 'express';
import Carts from '../models/cart';

const router = express.Router();

router.get('/', function (req, res)
{
	res.json({ message: 'Welcome to our api!'});
});


router.route('/carts')
// create a new user (accessed at POST http://localhost:8080/api/users)
    
// get all the users (accessed at GET http://localhost/api/users)
	 .get(function(req, res) {
 		Carts.find(function(err, carts) {
 		if (err)
 			res.send(err);
		res.json(carts);
 		});
 	})
	 .post(function(req, res){
		 var cart = new Carts();
		 cart.id = 'anh day';
		 cart.title = 'req.body.email';
		 cart.cost = 123;
		 console.log('title:' + req.body.email);
		 console.log('cost:' + req.body.password);
		 cart.save(function(err) {
			 if(err){
				 res.json({suc: 'that cmn bai'});
			 }else{
				 res.json({suc: 'thanh cmn cong'});
			 }
		 });
	 })

router.route('/')

export default router;