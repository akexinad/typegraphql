import { createConnection } from "typeorm";

export const testConnection = (drop: boolean) => {
    return createConnection({
        type: "postgres",
        url: "postgres://postgres:psql1234@localhost:5432/typegraphql-test",
        synchronize: true,
        dropSchema: drop,
        entities: [__dirname + "/../entities/*.*"]
    });
};
