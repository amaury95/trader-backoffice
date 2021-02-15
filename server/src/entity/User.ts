import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
} from "typeorm";
import { Role } from "./Role";
import { Transaction } from "./Transaction";

@Entity("users")
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column("text")
  password: string;

  @Column({ unique: true })
  name: string;

  @Column({ type: "double" })
  balance: number;

  @Column({ type: "double" })
  fee: number;

  @OneToMany(() => Role, (role) => role.user)
  roles: Promise<Role[]>;

  @OneToMany(() => Transaction, (transaction) => transaction.receiver)
  income: Promise<Transaction[]>;

  @OneToMany(() => Transaction, (transaction) => transaction.sender)
  outcome: Promise<Transaction[]>;

  static hasRole = async (id: string, ...roles: number[]) => {
    const user = await User.findOne(id);

    return user && user.hasRole(...roles);
  };

  hasRole = async (...roles: number[]) =>
    (await this.roles).some((r) => roles.includes(r.value));
}
