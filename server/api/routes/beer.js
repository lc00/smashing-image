var express = require('express');
var BeerController = require('../controllers/beer');

var beerController = new BeerController();

var router = express.Router();

router.post('/', beerController.add);
router.get('/', beerController.get);
router.get('/', beerController.getAll);

module.exports = router;


