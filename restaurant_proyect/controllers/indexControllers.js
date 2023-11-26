const connection = require('../config/db')

class IndexControllers {
  viewHome = (req, res) => {
    let sql = "SELECT * FROM dishes WHERE dishes_isdeleted = 0"
    connection.query(sql, (err, result)=>{
    if(err) throw err;
    res.render('index', {result});
  })
  }
}

module.exports = new IndexControllers;