import { Resolver, Mutation, Query, Arg } from "type-graphql";
import { User } from "../../entity/User";
import bcrypt from "bcryptjs";

@Resolver()
export class RegisterUser {
  @Query(() => String)
  async hello() {
    return "hello11";
  }

  @Mutation(() => User)
  async register(
    @Arg("name") name: string,
    @Arg("password") password: string,
    @Arg("email") email: string,
    @Arg("role") role: string
  ) {
    const hashPassword = await bcrypt.hash(password, 13);
    const user = await User.create({
      name: name,
      password: hashPassword,
      email: email,
      role: role
    }).save();

    return user;
  } //register ends
}
