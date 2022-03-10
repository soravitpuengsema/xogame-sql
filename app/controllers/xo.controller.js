const db = require("../models");
const xo_list = db.xo_list;
const Op = db.Sequelize.Op;

exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

    xo_list.findAll({ where: condition })
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

exports.update = (req, res) => {
    const id = req.params.id;

    xo_list.update(req.body, {
        where: { id: 1 }
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