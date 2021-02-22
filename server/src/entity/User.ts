import { Entity, Column, BaseEntity, OneToMany, PrimaryColumn } from "typeorm";
import { Transaction } from "./Transaction";

@Entity("users")
export class User extends BaseEntity {
  @PrimaryColumn({ type: "text" })
  id: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  username: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  avatar: string;

  @Column({ type: "double" })
  balance: number;

  @Column({ type: "double" })
  fee: number;

  @OneToMany(() => Transaction, (transaction) => transaction.receiver)
  income: Promise<Transaction[]>;

  @OneToMany(() => Transaction, (transaction) => transaction.sender)
  outcome: Promise<Transaction[]>;
}
