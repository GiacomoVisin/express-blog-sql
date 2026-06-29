const array = require(`../data/data`)
const connection = require(`../database/connection`)

function index(req, res) {

    const sql = `SELECT * FROM posts`;
    connection.query(sql, (err, array) => {
        console.log(err);

        if (err) {
            console.error(`Error in the execution of the query:`, err);
            return res.status(500).json({ error: true, message: "internal server error" })
        }
        res.json(array)
    })
}





function Show(req, res) {
   
const {id} = req.params

  const sql = 'SELECT * FROM posts WHERE id = ?';
  connection.query(sql, [id], (err, results) => {
    if (err) return res.status(500).json({ error: 'Error in the execution of the query' });
    if (results.length === 0) return res.status(404).json({ error: 'Post not found' });
    res.json(results[0]);
  });
}



function Store(req, res) {

    const NewID = array[array.length - 1].id + 1

    const newProduct = {
        id: NewID,
        titolo: req.body.titolo,
        contenuto: req.body.contenuto,
        immagine: req.body.immagine,
        tag: [req.body.tag]
    }

    array.push(newProduct)

    res.json({
        status: "200",
        product: newProduct
    })


    console.log(array);

}



function Update(req, res) {
    const ID = parseInt(req.params.id)
    const product = array.find((obj) => obj.id === ID)

    if (!product) {
        res.status(404)
        return res.json({
            error: "Not Found",
            message: "Product not found"
        })
    }

    product.id = ID,
        product.titolo = req.body.titolo,
        product.contenuto = req.body.contenuto,
        product.immagine = req.body.immagine,
        product.tag = [req.body.tag]

    console.log(product);
    res.json({
        status: 200,
        post: product
    })
}

function Modify(req, res) {
    res.send(` Modifica Prodotti per id ${req.params.id}`)
}

function Delete(req, res) {
    
    const {id} = req.params
    connection.query(`DELETE FROM posts WHERE id = ?`, [id], (err)=>{
        if (err) return res.status(500).json({error:"Deleting failed"})
    })
  
    res.sendStatus(204)
}

module.exports = { index, Show, Store, Update, Modify, Delete }