module.exports = app => {
    const xo = require("../controllers/xo.controller.js");

    var router = require("express").Router();

    router.post("/", xo.create);

    router.get("/", xo.findAll);

    router.put("/", xo.update);

    app.use('/api/xo',router);
}