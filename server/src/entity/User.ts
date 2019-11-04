import { BaseEntity, Entity, Column, ObjectIdColumn } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => ID)
  @ObjectIdColumn({ name: "id" })
  _id!: number;

  @Field()
  @Column()
  name: string;

  @Column()
  password: string;

  @Field()
  @Column("text", { unique: true })
  email: string;

  @Field()
  @Column()
  role: string;
}
