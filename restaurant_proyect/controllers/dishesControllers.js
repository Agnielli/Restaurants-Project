const connection = require('../config/db')

class DishesControllers {
  showAllDishes = (req, res) => {
    let sql = 'SELECT * FROM dishes WHERE dishes_isdeleted = 0'
    connection.query(sql, (err, result)=>{
      if(err) throw err;
      console.log(result);
      res.render('allDishes', {result});
    })
  }

  // abre el formulario de creación de plato al que mandamos el id del restaurante
viewCreateDishes = (req, res) => {
  let id = req.params.id
  res.render("formDishes", {restaurant_id:id})
}

createDishes = (req, res) => {
  let id = req.params.id
  const { dishes_name, dishes_description } = req.body;
  console.log(req.body);
  console.log(id);
  console.log(req.file);
  let sql = `INSERT INTO dishes (dishes_name, dishes_description, restaurant_id, dishes_img) VALUES ("${dishes_name}", "${dishes_description}", "${id}", "nopic.png")`

  if (req.file != undefined){
    let img = req.file.filename;
    sql = `INSERT INTO dishes (dishes_name, dishes_description, restaurant_id, dishes_img) VALUES ("${dishes_name}", "${dishes_description}", "${id}", "${img}")`
  }
  connection.query(sql, (err, result) =>{
    if(err) throw err;
    res.redirect(`/restaurants/oneRestaurant/${id}`)
  })
}

totalDelete = (req, res) =>{
  let { id, restaurant_id } = req.params;
  let sql = `DELETE FROM dishes WHERE dishes_id = ${id}`

  connection.query(sql, (err, result) =>{
    if(err) throw err;
    res.redirect(`/restaurants/oneRestaurant/${restaurant_id}`)
  })
}

delLogicDishes = (req, res) =>{
  let { id, restaurant_id } = req.params;
  console.log(id);
  let sql = `UPDATE dishes SET dishes_isdeleted = 1 WHERE dishes_id = ${id}`

  connection.query(sql, (err, result) =>{
    if(err) throw err;
    res.redirect(`/restaurants/oneRestaurant/${restaurant_id}`)
  })

}

}

module.exports = new DishesControllers;