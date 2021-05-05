module.exports = {
    type: "postgres",
    url: "postgres://postgres:psql1234@localhost:5432/typegraphql",
    // host: "localhost",
    // port: 5432,
    // username: "postgres",
    // password: "psql1234",
    // database: "typegraphql",
    logging: true,
    synchronize: true,
    entities: ["src/entities/*.*"]
};
