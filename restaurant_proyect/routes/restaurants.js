var express = require('express');
var router = express.Router();
const uploadImage = require('../middlewares/multer');
const restaurantsControllers = require('../controllers/restaurantsControllers');

// nos enseña todos los restaurants
// localhost:3000/restaurants
router.get('/', restaurantsControllers.showAllRestaurants);

// abre página con form de registro
// localhost:3000/register
router.get('/register', restaurantsControllers.restaurantRegister)

// recoja los datos del formulario
// localhost:3000/register
router.post('/register', uploadImage("restaurant"), restaurantsControllers.createRestaurant)

// abre la página con info de un restaurante determinado FÁCIL
// localhost:3000/restaurants/oneRestaurant/1
router.get("/oneRestaurant/:id", restaurantsControllers.viewOneRestaurant)

// abre el formulario de edición del restaurante
// localhost:3000/restaurants/editRestaurant/1
router.get('/editRestaurant/:id', restaurantsControllers.showEditRestaurant)

// recoge los datos del formulario modificado
// localhost:3000/restaurants/editRestaurant/1
router.post('/editRestaurant/:id', uploadImage("restaurant"), restaurantsControllers.editRestaurant)

// abre el formulario de login de restaurante
router.get("/login", restaurantsControllers.viewLogin)

// recoge la info del formulario de login
router.post("/login", restaurantsControllers.login)

// borrado lógico del restaurante
router.get("/deleteRestaurantLogic/:id", restaurantsControllers.delLogicRestaurant)

// borrado total del restaurante
router.get("/deleteRestaurant/:id", restaurantsControllers.delRestaurant)

module.exports = router;