const db = require("../models");
const xo = db.xo;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {

    const xo = {
        history: req.body.history,
        stepNumber: req.body.stepNumber,
        xIsNext: req.body.xIsNext ? req.body.xIsNext :false,
        xIP: req.body.xIP,
        oIP: req.body.oIP
    };

    xo.create(xo)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Board."
            });
        });
};

exports.findAll = (req, res) => {
    //const id = req.query.title;
    var condition = 1;

    xo.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Board."
            });
        });
};

exports.findOne = (req, res) => {
    const id = 4;
  
    xo.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Board with id=" + 4
        });
      });
  };

exports.update = (req, res) => {
    const id = 4;
    xo.update(req.body, {
        where: { id: 4 }
    })
        .then(num => {
            if(num == 1) {
                res.send({
                    message: "Board was updated successfully."
                });
            }
            else {
                res.send({
                    message: `Cannot update Board with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Board with id=" + id
            });
        });
};

