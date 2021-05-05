import { Query, Resolver } from "type-graphql";

@Resolver()
export class HelloResolver {
    @Query(() => String, { name: "helloWorld" })
    async hello() {
        return "hello world";
    }
}
