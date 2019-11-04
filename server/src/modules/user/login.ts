import { Resolver, Mutation, Arg } from "type-graphql";
import { User } from "../../entity/User";
import { compare } from "bcryptjs";

@Resolver()
export class LoginUser {
  //   @Query(() => String)
  //   async hello() {
  //     return "hello11";
  //   }

  @Mutation(() => User || String)
  async login(@Arg("password") password: string, @Arg("email") email: string) {
    const user = await User.findOne({ where: { email } }).then(user => {
      if (user) {
        return user;
      }
    });

    if (!user) {
      return null;
    }

    const valid = await compare(password, user.password);

    if (!valid) {
      return null;
    }
    console.log(user);
    return user;
  } //login ends
}
