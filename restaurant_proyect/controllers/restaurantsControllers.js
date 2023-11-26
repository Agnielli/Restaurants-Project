const bcript = require('bcrypt')
const connection = require('../config/db')

class RestaurantsControllers {
// abre la vista de todos los restaurantes
showAllRestaurants = (req, res) => {
  let sql = "SELECT * FROM restaurant WHERE rest_isdeleted = 0"
  connection.query(sql, (err, result) => {
    if(err) throw err;
    res.render('allRestaurants', {result});
  })
}

// abre la página de form register
restaurantRegister = (req, res) => {
  res.render('registerForm')
}

createRestaurant = (req, res) => {
  console.log(req.body);
  const {rest_name, style, email, password, password2, rest_description, phone} = req.body;
  
  if(
    rest_name === "" ||
    style === "" ||
    email === "" ||
    password === ""
    ){
      return res.render('registerForm', {message: "ES NECESARIO RELLENAR LOS CAMPOS"})
    }

    if(password !== password2){
      return res.render("registerForm", {message: "El password debe ser igual!!"})
    }
    console.log("aaaaaaaaaaaaaaa!", req.file)
    
    // encriptar contraseña
    bcript.hash(password, 10, function(err, hash){
      if(err) throw err;
      let sql = `INSERT INTO restaurant (rest_name, style, email, rest_description, phone, password, rest_img) VALUES ("${rest_name}", "${style}", "${email}", "${rest_description}", "${phone}", "${hash}", "user.png")`

      if (req.file != undefined){
        let img = req.file.filename;
        sql = `INSERT INTO restaurant (rest_name, style, email, rest_description, phone, password, rest_img) VALUES ("${rest_name}", "${style}", "${email}", "${rest_description}", "${phone}", "${hash}", "${img}")`
      }

      connection.query(sql, (err, result) => {
        if(err){
          if(err.errno == 1062){
            return res.render("registerForm", {message: "El email ya existe en la aplicación!!"})
          }else{
          throw err;
          }
        }

        res.redirect("/restaurants")
      })
    })
    
  }
// facil pero poco rendimiento
viewOneRestaurant = (req, res) => {
  let id = req.params.id
  let sql = `SELECT * FROM restaurant WHERE restaurant_id = ${id} AND rest_isdeleted = 0`
  let sql_dishes = `SELECT * FROM dishes WHERE restaurant_id = ${id} AND dishes_isdeleted = 0`;
  
  connection.query(sql, (err, result) =>{
      if(err) throw err;
      connection.query(sql_dishes, (err_dishes, result_dishes) =>{
          if(err_dishes) throw err_dishes;
          res.render("oneRestaurant", {result, result_dishes})
      })
  })
}
showEditRestaurant = (req, res) => {
  let id = req.params.id;
  let sql = `SELECT * FROM restaurant WHERE restaurant_id = ${id} and rest_isdeleted = 0`
    
  connection.query(sql, (err, result) =>{
    if(err) throw err;
    res.render("editFormRestaurant", {result})
  })
}

// Aquí algo no está bien o en el action del form
editRestaurant = (req, res) => {
  let id = req.params.id;
  const{ rest_name, style, phone, rest_description } = req.body;
  console.log("aaaaaaaaaaaaaaa!", req.file)
  if(
    rest_name === "" ||
    style === "" ||
    phone === "" ||
    rest_description === ""
    ){
      return res.render('editFormRestaurant', {message: "ES NECESARIO RELLENAR LOS CAMPOS"})
    }

  let sql = `UPDATE restaurant SET rest_name = "${rest_name}", style = "${style}", phone = "${phone}", rest_description = "${rest_description}" WHERE restaurant_id = ${id}`

  if(req.file != undefined){
    let img = req.file.filename;
    sql = `UPDATE restaurant SET rest_name = "${rest_name}", style = "${style}", phone = "${phone}", rest_description = "${rest_description}", rest_img = "${img}" WHERE restaurant_id = ${id}`
  }

  connection.query(sql, (err, result) => {
    if(err) throw err;
    res.redirect(`/restaurants/oneRestaurant/${id}`)
  })
}

viewLogin = (req, res) => {
  res.render("formLogin")
}

login = (req, res) => {
  const { email, password } = req.body;

  // ver si este restaurante está en bd
  let sql = `SELECT * FROM restaurant WHERE email = "${email}"`
  connection.query(sql, (err, result) => {
    if(err) throw err;

    if(result.length == 1) {
      let hash = result[0].password;
      bcript.compare(password, hash, (err, resultCompare) => {
        if(err) throw err;
        if(resultCompare /* == true */){
          res.redirect(`/restaurants/oneRestaurant/${result[0].restaurant_id}`)
        }else{
          res.render("formLogin", {message: "password incorrecta"})
        }

      })
      
    }else{
      return res.render("formLogin", {message: "email no existe"})
    }
  })
}

delLogicRestaurant = (req, res) =>{
  let id = req.params.id;
  console.log(id);
  let sql = `UPDATE restaurant LEFT JOIN dishes ON restaurant.restaurant_id = dishes.restaurant_id SET restaurant.rest_isdeleted = 1, dishes.dishes_isdeleted = 1 WHERE restaurant.restaurant_id = ${id}`

  connection.query(sql, (err, result) =>{
    if(err) throw err;
    res.redirect('/restaurants')
  })

}

delRestaurant = (req, res) =>{
  let { id, restaurant_id } = req.params;
  let sql = `DELETE FROM restaurant WHERE restaurant.restaurant_id = ${id}`

  connection.query(sql, (err, result) =>{
    if(err) throw err;
    res.redirect(`/restaurants`)
  })
}

}

module.exports = new RestaurantsControllers