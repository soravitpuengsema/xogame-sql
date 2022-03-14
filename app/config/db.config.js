module.exports = {
    HOST: "us-cdbr-east-05.cleardb.net",
    USER: "b20a05d04457ee",
    PASSWORD: "9e732fa5",
    DB: "heroku_5bb93df9e4fe82b",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};