const express = require('express');
const router = express.Router();
const multer = require('../middlewares/multer');
const dishesControllers = require('../controllers/dishesControllers');

// entrada: localhost:3000/dishes
router.get('/', dishesControllers.showAllDishes)

// abre formulario de creación de obra
router.get('/createDishes/:id', dishesControllers.viewCreateDishes)

// recojo los datos del plato y recupera de params el id del restaurante
router.post('/createDishes/:id', multer("dishes"), dishesControllers.createDishes)

//borrar totalmente dishes
router.get('/deleteDishes/:id/:restaurant_id', dishesControllers.totalDelete)

//borrar logicamente dishes
router.get('/deleteDishesLogic/:id/:restaurant_id', dishesControllers.delLogicDishes)

// abre el formulario de edición del plato
// localhost:3000/restaurants/editRestaurant/1
router.get('/editDishes/:id/:restaurant_id', dishesControllers.showEditDishes)

// recoge los datos del formulario modificado
// localhost:3000/restaurants/editRestaurant/1
router.post('/editDishes/:id/:restaurant_id', multer("dishes"), dishesControllers.editDishes)


module.exports = router;