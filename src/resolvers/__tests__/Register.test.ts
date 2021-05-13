import faker from "faker";
import { Connection } from "typeorm";
import { User } from "../../entities/User";
import { graphQLCall } from "../../test-utils/graphQLCall";
import { testConnection } from "../../test-utils/testConnection";

let connection: Connection;

beforeAll(async () => {
    connection = await testConnection(false);
});

afterAll(async () => {
    await connection.close();
});

jest.mock("../../utils/sendEmail");

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

const {
    name: { firstName, lastName },
    internet: { email, password }
} = faker;

describe("Register Resolver", () => {
    it("creates a user", async () => {
        const userToRegister = {
            firstName: firstName(),
            lastName: lastName(),
            email: email(),
            password: password()
        };

        const response = await graphQLCall({
            source: registerMutation,
            variableValues: {
                data: userToRegister
            }
        }).then();

        expect(response).toMatchObject({
            data: {
                register: {
                    firstName: userToRegister.firstName,
                    lastName: userToRegister.lastName,
                    email: userToRegister.email
                }
            }
        });

        const dbUser = await User.findOne({
            where: { email: userToRegister.email }
        });

        expect(dbUser).toBeDefined();
        expect(dbUser!.firstName).toEqual(userToRegister.firstName);
        expect(dbUser!.lastName).toEqual(userToRegister.lastName);
    }, 8000);
});
