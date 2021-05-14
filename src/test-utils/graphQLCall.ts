import { graphql, GraphQLSchema } from "graphql";
import { ChangePasswordResolver } from "../resolvers/ChangePassword";
import { ConfirmUserResolver } from "../resolvers/ConfirmUser";
import { ForgotPasswordResolver } from "../resolvers/ForgotPassword";
import { LoginResolver } from "../resolvers/Login";
import { LogoutResolver } from "../resolvers/Logout";
import { MeResolver } from "../resolvers/Me";
import { RegisterResolver } from "../resolvers/Register";
import { buildSchema, Maybe } from "type-graphql";

type Options = {
    source: string;
    variableValues?: Maybe<{
        [key: string]: any;
    }>;
    userId?: number;
};

/**
 * This is to ensure the schema is only instantiated once during tests
 */
let schema: GraphQLSchema;

export const graphQLCall = async ({
    source,
    variableValues,
    userId
}: Options) => {
    if (!schema) {
        schema = await buildSchema({
            resolvers: [
                ChangePasswordResolver,
                ConfirmUserResolver,
                ForgotPasswordResolver,
                LoginResolver,
                LogoutResolver,
                MeResolver,
                RegisterResolver
            ],
            authChecker: ({ context }) => {
                return !!context.req.session.userId;
            }
        });
    }

    return graphql({
        schema,
        source,
        variableValues,
        contextValue: {
            req: {
                session: {
                    userId
                }
            },
            res: {
                clearCookie: jest.fn()
            }
        }
    });
};
