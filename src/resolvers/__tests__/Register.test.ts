import { Connection } from "typeorm";
import { graphQLCall } from "../../test-utils/graphQLCall";
import { testConnection } from "../../test-utils/testConnection";

let connection: Connection;

beforeAll(async () => {
    connection = await testConnection(false);
});

afterAll(() => {
    connection.close();
});

const registerMutation = `
    mutation Register($data: RegisterInput!) {
        register(registerInputOptions: $data) {
            id
            firstName
            lastName
            email
            name
        }
    }
`;

describe("Register Resolver", () => {
    it("creates a user", async () => {
        const res = await graphQLCall({
            source: registerMutation,
            variableValues: {
                data: {
                    firstName: "federico",
                    lastName: "fellini",
                    email: "fellini@ex.it",
                    password: "chicken"
                }
            }
        });

        console.log(`res.`, res);
    });
});
