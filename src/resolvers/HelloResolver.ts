import { isAuth } from "../middleware/isAuth";
import { Query, Resolver, UseMiddleware } from "type-graphql";

@Resolver()
export class HelloResolver {
    /**
     * 2 ways of handling auth
     *
     * with useMiddleware, you can pass in multiple middleware functions
     */
    // @Authorized()
    @UseMiddleware(isAuth)
    @Query(() => String, { name: "helloWorld" })
    async hello() {
        return "hello world";
    }
}
