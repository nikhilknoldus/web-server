import { Resolver, Mutation, Arg, Ctx } from "type-graphql";
import { User } from "../../entity/User";
import { compare } from "bcryptjs";
import { MyContext } from "../../utils/MyContext";
import {
  createAccessToken,
  createRefreshToken
} from "../../utils/createTokens";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class LoginResponse {
  @Field()
  accessToken: string;
}

@Resolver()
export class LoginUser {
  @Mutation(() => LoginResponse)
  async login(
    @Arg("password") password: string,
    @Arg("email") email: string,
    @Ctx() { res }: MyContext
  ) {
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
    res.cookie("jid", createRefreshToken(user), {
      httpOnly: true
    });

    return {
      accessToken: createAccessToken(user)
    };
  } //login ends
}
