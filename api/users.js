const router = require('express').Router();
const {User, Order} = require('../db').models;

// /api/users

// get all orders of the user
router.get('/', (req, res, next)=>{
	User.findAll({
		include:[Order]
	})
		.then(users => {
			res.send(users)
		})
		.catch(next)
});

// add a product to savedList
router.put('/savelist', (req, res, next) => {

	const id = 3 // from req.session.userId
	User.findById(id)
		.then(user => {
			// user.saveList.push(req.body) does not work...
			user.savedList = user.savedList.concat([req.body])
			return user.save()
		})
		.then(user => {
			res.send(user.savedList)
		})
		.catch(next)
})

// get all products from savedList
router.get('/savelist', (req, res, next) => {
	const id = 3  // from req.sesson.userId
	User.findById(id)
		.then( user => {
			res.send(user.savedList)
		})
		.catch(next)
})

// remove a products from savedList
router.put('/savelist/:productId', (req, res, next) => {

		const id = 3 // from req.session.userId
		User.findById(id)
			.then(user => {
				user.savedList = user.savedList.filter( product => product.id !== req.params.productId * 1)
				return user.save()
			})
			.then(user => {
				res.send(user.savedList)
			})
			.catch(next)
	})


// someone might not have any order....
router.put('/:userId', (req, res, next)=>{
	User.findById(req.params.userId, {
		include: [Order]
	})
		.then(user => {
			user.userType = 'admin'
			return user.save()
		})
		.then(user => {
			res.send(user)
		})
		.catch(next)
});

module.exports = router;
