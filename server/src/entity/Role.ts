import {
  BaseEntity,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { User } from "./User";

@Entity("roles")
export class Role extends BaseEntity {
  static investor = 1;
  static accountant = 2;
  static admin = 3;

  @PrimaryColumn()
  value: number;

  @PrimaryColumn()
  userId: number;

  @ManyToOne(() => User, (user) => user.roles)
  @JoinColumn({ name: "userId" })
  user: User;
}
