module.exports = (sequelize, Sequelize) => {
    const Xo = sequelize.define("xo", {
        history: {
            type: Sequelize.STRING
        },
        stepNumber: {
            type: Sequelize.INTEGER
        },
        xIsNext: {
            type: Sequelize.BOOLEAN
        },
        xIP: {
            type: Sequelize.STRING
        },
        oIP: {
            type: Sequelize.STRING
        }
    });

    return Xo;
};