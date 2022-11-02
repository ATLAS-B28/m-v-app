const router = require('express').Router()
const {controller,findById,postMovie} = require('../controllers/controllers')
router.route('/').get(controller).post(postMovie)
router.get('/:id',findById)
module.exports = router