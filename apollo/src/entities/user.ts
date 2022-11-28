import { Field, ID, ObjectType } from 'type-graphql'
import { v4 as randomUUID } from 'uuid'

@ObjectType()
export class User {
  @Field(() => ID)
  id: string = randomUUID()

  @Field(() => String)
  email!: string

  @Field(() => String, { nullable: true })
  nickname?: string

}
