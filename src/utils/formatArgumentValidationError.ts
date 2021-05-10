import { GraphQLError, GraphQLFormattedError } from "graphql";

export const formatArgumentValidationError = (
    error: GraphQLError
): GraphQLFormattedError => {
    console.log(`error ================================>`, error);

    if (error && error.extensions) {
        error.extensions.code = "GRAPHQL_VALIDATION_FAILED";
    }

    return error;
};

/***
 * 
type ValidationError = {
    constraints: {
        [key: string]: string;
    }[];
};

let validationMessages;

if (error && error.extensions) {
    validationMessages = error.extensions.exception.validationErrors.map(
            (err: ValidationError) => {
            return Object.entries(err.constraints).map(
                ([constraintType, message]) => {
                    return {
                        [constraintType]: message
                    };
                }
            );
        }
    );
}
 * 
 */
