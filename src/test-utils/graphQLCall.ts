import { graphql, GraphQLSchema } from "graphql";
import { buildSchema, Maybe } from "type-graphql";

type Options = {
    source: string;
    variableValues?: Maybe<{
        [key: string]: any;
    }>;
};

/**
 * This is to ensure the schema is only instantiated once during tests
 */
let schema: GraphQLSchema;

export const graphQLCall = async ({ source, variableValues }: Options) => {
    if (!schema) {
        schema = await await buildSchema({
            resolvers: [__dirname + "/../resolvers/*.ts"],
            authChecker: ({ context }) => {
                return !!context.req.session.userId;
            }
        });
    }

    return graphql({
        schema,
        source,
        variableValues
    });
};
