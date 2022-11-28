import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql'
import { MyContext } from '../../context'
import { User } from '../../entities/user'



@Resolver(() => User)
export class UserResolver {
  @Query(() => User, { nullable: false })
  async users(@Ctx() { greeting }: MyContext): Promise<User> {
    return {
email: 'a',
id: '1',
nickname: '2'
    }
  }
}
