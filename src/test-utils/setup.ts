import { testConnection } from "./testConnection";

/**
 * At times node doesn't finish out with the promise
 * so it's a good idea to call process.exit to shut down
 * node.
 */
testConnection(true).then(() => process.exit());
