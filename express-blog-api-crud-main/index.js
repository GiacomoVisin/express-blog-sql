const express = require(`express`)
const app = express()
const port = 3001
const router = require(`./routes/products`)

function endpointError(req, res, next) {
    res.status(404)
    res.json({
        Status: "ERROR",
        message: "Pagina non trovata"
    });
};


	
function errorHandler(err, req, res, next) {
  res.status(500)
  res.json({
    error: "PAGE NOT EXIST"
  });
};


app.use(express.json())
app.use(`/`, router)


app.use(endpointError)

app.use(errorHandler)

app.listen(port, () => {
    console.log(`the app is working on the port http://localhost:${port}`);
})