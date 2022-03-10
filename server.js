const express = require("express"); //import express for build REST api => DELETE,PUT,GET,POST,etc.*
const bodyParser = require("body-parser");
const cors = require("cors"); //import cross-origin-resource Sharing -> file*

const app = express();

var corsOptions = {
    origin: "*"
};

app.use(cors(corsOptions));

app.use(bodyParser.json()); // request type json express send json

app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");

db.sequelize.sync();

const xo = db.xo;

var data = {
    history: JSON.stringify([
        {
          squares: Array(9).fill(null)
        }
      ]),
    stepNumber: 0,
    xIsNext: true,
    xIP: 0,
    oIP: 0
};

xo.create(data);

//simple route
app.get("/", (req, res) => { // req = request  res = respone
    res.json({ message: "XO Online JA" });
})

require("./app/routes/xo.routes")(app);

//set port
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
})