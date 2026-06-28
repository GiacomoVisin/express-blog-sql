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
    const id = parseInt(req.params.id)
    const singleOBJ = array.find((obj) => obj.id === id)

    if (!singleOBJ) {

        res.status(404)

        return res.json({
            error: "Not Found",
            message: "Object doesn't exist"
        })
    }
    res.json(singleOBJ)
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
    const id = parseInt(req.params.id)
    const product = array.find((product) => product.id === id)

    if (!product) {
        res.status(404)
        return res.json({
            error: "Not Found",
            message: "Object doesn't exist"
        })
    }

    array.splice(array.indexOf(product), 1)


    console.log(array);

    res.sendStatus(204)
}

module.exports = { index, Show, Store, Update, Modify, Delete }